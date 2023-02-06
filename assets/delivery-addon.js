
let EgaDeliveryAddon = function(egaDeliverySettings) {
    let {
        platform,
        currentTemplate,
        title,
        labelDatePicker,
        labelTimePicker,
        orderTime,
        optionDefault,
        inputBackground,
        inputBorder,
        inputColor,
        datepickerBg,
        position,
        query,

    } = egaDeliverySettings.general;
    let {
        note,
        availableDay,
        timeSlots,
        enableTimeSlots,
        enableDateSlots,
        dateSlots
    } = egaDeliverySettings.advanced
    this.start = function() {

        if (window.EgaUtils && window.egaDeliveryValid) {
            const eu = window.EgaUtils;
            // Time config 
            let timeStorage;
            let picker
            let checkDate = new Date();
     
            let newDate = new Date()
            timeStorage = {
                time: optionDefault,
                date: newDate
            }
            orderTime = +orderTime
            if (orderTime >= 24 * 60) {
                timeStorage = {
                    ...timeStorage,
                    date: new Date(timeStorage.date.setDate(Math.round(orderTime / 1440) + timeStorage.date.getDate()))
                }
            }
            // Generate  time option
            let optionHTML = this.generateOption(timeStorage.date, timeStorage.time);
            // Genrate date option 
            let datePicker = eu.html("input", {
                id: "datepicker",
                className: "ega-delivery__date ega-form__control",
                readOnly: true,
                type: "text",

            })
            let isUseDateSlots = enableDateSlots && dateSlots && dateSlots.length
            if (isUseDateSlots) {
                let dateOptionHTML = this.generateDateOption()
                datePicker = eu.html("select", {
                    id: "datepicker",
                    className: "ega-delivery__date ega-form__control",
                    value: dateSlots[0].title,
                    innerHTML: dateOptionHTML
                })
            }

            // Init delivery addon
            let inputStyle = `
      --input-background: ${inputBackground}; 
      --input-color: ${inputColor}; 
      --input-border:${inputBorder};
      --datepicker-square: ${datepickerBg}
      `

            const deliveryWrapper = eu.html("div", {
                    className: `ega-delivery__wrapper ${position}`,
                }, [
                    eu.html("p", {
                        className: "ega-delivery__title",
                        innerHTML: title,
                    }),
                    eu.html("div", {
                        className: "ega-delivery ega-form__group",
                        style: inputStyle
                    }, [
                        eu.html("label", {
                            textContent: labelDatePicker
                        }, [datePicker]),
                        eu.html("label", {
                            textContent: labelTimePicker
                        }, [
                            eu.html("select", {
                                className: "ega-delivery__time ega-form__control",
                                style: inputStyle,
                                innerHTML: optionHTML
                            })
                        ])

                    ]),
                    eu.html("div", { className: "ega-delivery__note", innerHTML: note || '' })
                ]

            );
            if (currentTemplate === "cart" && platform) {

                function updateAttribute(val) {
                    fetch('/cart.js')
                        .then((response) => {
                            return response.json();
                        })
                        .then((cart) => {
                            if (!cart.attributes) return
                            if (Array.isArray(cart.attributes)) {
                                let attr = {}
                                cart.attributes.map(item => {
                                    attr[item.name] = item.value
                                })
                                attr['Thời gian giao hàng'] = val
                                platform.updateCartAttributes(attr, () => true)
                            } else {
                                let attr = cart.attributes
                                attr['Thời gian giao hàng'] = val
                                platform.updateCartAttributes(attr, () => true)
                            }
                            sessionStorage.setItem("ega-delivery-value", val)
                        });
                }

                if (query) {
                    document.querySelector(query).appendChild(deliveryWrapper);

                } else {
                    let form = document.querySelector('form[action="/cart"]');
                    form && form.parentNode.prepend(deliveryWrapper)
                }

                // Init date picker 
                if (!isUseDateSlots) {
                   
                    picker = datepicker('#datepicker', {
                        startDate: new Date(),
                        disabler: date => {
                            let now = new Date();
                            now.setDate(now.getDate() - 1);
                            if (checkDate) {
                                checkDate = new Date(checkDate)
                                now = now.setDate(checkDate.getDate() - 1);

                            }
                            if (availableDay && availableDay.length) {
                                let day = date.getDay()
                                let isInWeeks = availableDay.some(item => item.name == day.toString())
                                let currDate = new Date(timeStorage.date).setHours(0, 0, 0, 0)

                                let isPass = date < currDate
                                let isMaxDate = false
                          
                                return !isInWeeks || isPass || isMaxDate
                            } else {
                                return true
                            }
                            // return date < new Date(timeStorage.date) 

                        },
                        formatter: (input, date, instance) => {
                            let dd = date.getDate();
                            let mm = date.getMonth() + 1; //January is 0!

                            let yyyy = date.getFullYear();
                            if (dd < 10) {
                                dd = '0' + dd;
                            }
                            if (mm < 10) {
                                mm = '0' + mm;
                            }
                            const value = dd + '/' + mm + '/' + yyyy;
                            input.value = value // => '1/1/2099'
                        },
                        alwaysShow: false,
                        onSelect: (instance, selectedDate) => {
                            if (!selectedDate) return
                            picker.setDate(selectedDate, true)
                            let optionHTML = this.generateOption(selectedDate);
                            document.querySelector('.ega-delivery__time').innerHTML = optionHTML;
                            document.querySelector('.qs-datepicker-container').classList.add('qs-hidden')
                            let time = document.querySelector('.ega-delivery__time')
                            let date = document.querySelector('#datepicker')

                            updateAttribute(time.value ? `${date.value} → ${time.value}` : date.value)

                            //picker.calendarContainer.classList.add('ega-hidden')
                            setTimeout(() => {
                                document.body.click()
                                let el = document.querySelector(':focus');
                                if (el) el.blur();
                            }, 300)
                        },
                        customDays: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
                        customMonths: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12']
                    })
                    picker.setDate(timeStorage.date, true)
                    picker.hide()
                }

                if (platform) {
                    let time = document.querySelector('.ega-delivery__time')
                    let date = document.querySelector('#datepicker')
                    fetch('/cart.js')
                        .then((response) => {
                            return response.json();
                        })
                        .then((cart) => {
                            if (!cart.attributes) return
                            let attribute
                            if (Array.isArray(cart.attributes)) {
                                attr = cart.attributes.find(item => {
                                    return item.name == 'Thời gian giao hàng'
                                })
                                attribute = attr ? attr.value : ''
                            } else {
                                let attr = cart.attributes
                                attribute = attr['Thời gian giao hàng']
                            }
                            console.log(attribute)
                            if (!attribute) {
                                updateAttribute(time.value ? `${date.value} → ${time.value}` : date.value)
                            } else {
                                let storageDate = attribute
                                let storageValue = storageDate.split(' → ')
                                let dateValue = storageValue[0]
                                let timeValue = storageValue[1]
                                time.value = timeSlots.some(item => item.title.trim() == timeValue) ? timeValue : ''
                                dateValue = dateValue.split('/');
                                let newDate = new Date(+dateValue[2], (+dateValue[1] - 1), +dateValue[0])
                                let now = new Date().setHours(0, 0, 0)
                                newDate = now >= newDate.setHours(0, 0, 0) ? new Date() : newDate
                                picker.setDate(newDate, true)
                                attribute = time.value ? `${date.value} → ${time.value}` : date.value
                                sessionStorage.setItem("ega-delivery-value", attribute)

                            }

                        })

                    date.addEventListener("change", function() {
                        let time = document.querySelector('.ega-delivery__time')
                        let date = document.querySelector('#datepicker')
                        updateAttribute(time.value ? `${date.value} → ${time.value}` : date.value)
                    })
                    time.addEventListener("change", function() {
                        let time = document.querySelector('.ega-delivery__time')
                        let date = document.querySelector('#datepicker')
                        updateAttribute(time.value ? `${date.value} → ${time.value}` : date.value)
                    })
                }
            }

        }
    }

    this.generateOption = function(selectedDate, compareTime) {
        let optionHTML = `<option value="">${optionDefault}</option>`
        let timeGenerate;
        if (enableTimeSlots) {
            timeGenerate = this.generateTimeSlots() || []
            optionHTML = optionHTML + timeGenerate.map((opt) => `<option value="${opt}">${opt}</option>`).join('')
            return optionHTML
        }
        return optionHTML
    }
    this.generateDateOption = () => {
        let optionHTML = '';
        let timeGenerate = this.generateDateSlots() || []
        optionHTML = optionHTML + timeGenerate.map((opt) => `<option value="${opt}">${opt}</option>`).join('')
        return optionHTML
    }
    this.generateDateSlots = () => {
        let arrOption = []
        let options = dateSlots
        if (options && options.length) {
            arrOption = options.map(opt => opt.title.trim()).filter(Boolean)
        }
        return arrOption
    }
    this.generateTimeSlots = () => {
        let arrOption = []
        let options = timeSlots
        if (options && options.length) {
            arrOption = options.map(opt => opt.title.trim()).filter(Boolean)
        }
        return arrOption
    }


    this.isValidDate = (date) => {
        return date && Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date);
    }

}
if (window.EGADeliverySettings) {
    let egaDelivery = new EgaDeliveryAddon(window.EGADeliverySettings);
    egaDelivery.start();
}