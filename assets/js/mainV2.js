class MD {
    constructor() {
        this.g = k => document.querySelector(k);
        this.gA = k => document.querySelectorAll(k);
        this.back = localStorage.getItem('md-back') || "";
        this._initializeDefaults();
    }

    _initializeDefaults() {
        const allDefaults = gA('[md-data]');
        if (allDefaults.length) {
            for (let artdefault of allDefaults) {
                artdefault.addEventListener('click', (e) => {
                    const target = e.currentTarget;
                    const gobackSector = g('#' + target.getAttribute('md-data'));
                    if (!gobackSector.classList.contains('art-md-show')) { this.initialShow(gobackSector); }
                })
            }
        }

    }

    init() {
        const thisModal = this.g('.art-md-show');

        if (thisModal) {
            this.back = thisModal.id;
            localStorage.setItem('md-back', thisModal.id);

            thisModal.classList.remove('art-md-show');
            thisModal.classList.add('art-md-hide');
            thisModal.classList.add(thisModal.getAttribute('tag-data'));
        }
    }

    /** 
     * Template Function
     * @param id<String> is a string that defines the modal/document's id art-main-modal
     * @param header<String> is a string that defines the modal/document's Title in header section
     * @param content<String/Function> is a string/function[that returns string] that is used as user defined content to be displayed in the 
     * modal/document's content section
     * @param footer<String/Function> is a String/function[that returns the content] data to be put into md-footer
     * @param cb is a function<Function> that is being called after the content are being inserted successfully
     * @param cb [id]<String> is a String of the inserted Modal
     * @returns String: the Modal's content
     **/
    defaultTemplate(id, header, content, footer) {
        const addheader = () => {
            if (typeof header !== "undefined") {
                return `<div class="art-js-header-content">${header}</div>`;
            }
            return '';
        };
        const addFooter = () => {
            if (typeof footer === "function") {
                return `<div class="art-md-footer"> ${footer()} </div>`;
            } else if (typeof footer === "string") {
                return `<div class="art-md-footer"> ${footer} </div>`;
            }
            return ``;
        };
        const tmp = `<div class="art-main-modal art-md-hide right" id="${id}" tag-data-back="right" tag-data="left">
                    <!-- Section md header -->
                    <div class="art-md-header"> 
                    <button class="art-btn-no-mt art-btn waves-effect waves-ripple art-md-back" id="${id}_back">Back</button>
                        ${addheader()}
                    </div>
                    <!-- Main js content  -->
                    <div class="art-md-content">
                    ${typeof content === "function" ?this.mlt(content()):typeof content === "string"?content:''}   
                    </div>
                    ${addFooter()}
                </div>`;
        return tmp;
    }

    /** 
     * Write Function
     * @param options<Object> is an Object that contains the modal's data to be put into art-main-section
     * @param options.id<String> is a string that defines the modal/document's id art-main-modal
     * @param options.header<String> is a string that defines the modal/document's Title in header section
     * @param options.content<String/Function> is a string/function[that returns string] that is used as user defined content to be displayed in the 
     * modal/document's content section
     * @param options.footer<String/Function> is a String/function[that returns the content] data to be put into md-footer
     * @param cb is a function<Function> that is being called after the content are being inserted successfully
     * @param cb [id]<String> is a String of the inserted Modal
     * @returns String: the Modal's content
     **/
    write(options = {}, cb = (id = "") => {}) {
        const { id, header, content, footer } = options;

        this.init();

        localStorage.setItem('md-showing', id);

        const mainSection = this.g('.art-main-section');

        const tmp = this.defaultTemplate(id, header, content, footer);

        if (!this.g('#' + options.id)) {
            mainSection.insertAdjacentHTML('BeforeEnd', tmp);

            setTimeout(() => {
                this.existSector(id);
            }, 20);

        } else {
            this.existSector(id);
        }

        if (cb) {
            cb(id)
        }

        this.initializeBack(id);

        return tmp;
    }

    /** 
     * Initialize the back functionality after the Modal has successfully been inserted
     * @param currentID is a String of the current inserted Modal 
     **/
    initializeBack(currentID) {
        const gobackBtn = this.g('#' + currentID + ' ' + '.art-md-back');

        // Get the md back to fallback to
        const current_back = localStorage.getItem('md-back')

        // Store the the current md back element for the next use
        localStorage.setItem('md-back', this.back);

        // Add an event listener to the current showing element's back element/btn
        gobackBtn.addEventListener('click', (e) => {
            const gobackSector = this.g('#' + current_back);

            // Auto show the md back element when go back btn is clicked
            this.autoShow(gobackSector, currentID);
        })
    }

    /**
     * Initialize the show element when the md elements are already in the DOM
     * @param gobackSector is an element we want to show on main sector
     * @param currentID is an ID of the current showing md element
     **/
    initialShow(gobackSector, currentID) {
        let currentSector = currentID ? this.g('#' + currentID) : this.g('.art-md-show') ? this.gA('.art-md-show') : '';

        function showElemnt(currentSector) {
            // currentSector = window.event.currentTarget;
            if (currentSector && currentSector.id) {
                // Hide the current showing md element to have a room for the one we want to show in the progress
                currentSector.classList.add('left');
                currentSector.classList.remove('art-md-show');
                currentSector.classList.add('art-md-hide');

                // Check if the is not null/undefined as we want element with id pre-defined
                if (currentSector.id) {
                    localStorage.setItem('md-back', currentSector.id);
                }
            } else {
                if (window.event.currentTarget.parentElement.classList.contains('art-main-section')) {
                    currentSector = window.event.currentTarget.parentElement;
                    if (currentSector && !currentSector.classList.contains('art-main-section')) {
                        // Hide the current showing md element to have a room for the one we want to show in the progress
                        currentSector.classList.add('left');
                        currentSector.classList.remove('art-md-show');
                        currentSector.classList.add('art-md-hide');

                        // Check if the is not null/undefined as we want element with id pre-defined as well
                        if (currentSector.id) {
                            localStorage.setItem('md-back', currentSector.id);
                        } else {
                            // Generate a new id for the element
                            currentSector.id = currentSector.nodeName + currentSector.className.split(" ").join('_');
                            // Check if the id is unique and only apply to one one element whcih is ours
                            if (document.querySelectorAll("#" + currentSector.id).length === 1) {
                                localStorage.setItem('md-back', currentSector.id);
                            } else {
                                // Generate a new id with date time stamp if the first one appeared not to be unique
                                currentSector.id = currentSector.nodeName + currentSector.className.split(" ").join('_') + Date.now();
                                localStorage.setItem('md-back', currentSector.id);
                            }
                        }
                    } else {
                        currentSector = window.event.currentTarget;
                        if (currentSector) {

                            // Hide the current showing md element to have a room for the one we want to show in the progress
                            currentSector.classList.add('left');
                            currentSector.classList.remove('art-md-show');
                            currentSector.classList.add('art-md-hide');

                            // Generate a new id for the element
                            currentSector.id = currentSector.nodeName + currentSector.className.split(" ").join('_');
                            // Check if the id is unique and only apply to one one element whcih is ours
                            if (document.querySelectorAll("#" + currentSector.id).length === 1) {
                                localStorage.setItem('md-back', currentSector.id);
                            } else {
                                // Generate a new id with date time stamp if the first one appeared not to be unique
                                currentSector.id = currentSector.nodeName + currentSector.className.split(" ").join('_') + Date.now();
                                localStorage.setItem('md-back', currentSector.id);
                            }

                        }
                    }
                }
            }
        }

        // Store current showing md element's id to the local storage to be used late 
        if (currentSector && typeof currentSector !== "object") {
            localStorage.setItem('md-back', currentSector.id);
        } else if (currentSector && (typeof currentSector === "object" && currentSector.length)) {
            for (let _currentSector of currentSector) {
                currentSector = _currentSector;
                showElemnt(currentSector);

            }
        } else {
            currentSector = window.event.currentTarget;
            showElemnt(currentSector);
        }

        if (gobackSector) {
            // Remove all the classes that are hidding the md element that we to show and show it
            gobackSector.classList.add('art-md-show');
            gobackSector.classList.remove('art-md-hide');
            gobackSector.classList.remove(gobackSector.getAttribute('tag-data'));
            gobackSector.classList.remove(gobackSector.getAttribute('tag-data-back'));

            // Hide the current showing md element to have a room for the one we want to show in the progress
            currentSector.classList.remove('art-md-show');
            currentSector.classList.add('art-md-hide');
            currentSector.classList.add(currentSector.getAttribute('tag-data'));

            // Make the back functionalities if applicable
            this.initializeBack(gobackSector.id);
        }
    }

    /**
     * 
     * @param {*} gobackSector <String> The elemnt's id that will go back to after clicking the initialed back button and actual the extact element that will 
     * be shown
     * @param {*} currentID <?> The current element/element's id that is currently shown. by default is art-md-show.
     * So it looks through the DOM and try to find the element with the specified id or even the specified element, otherwise it looks for the art-md-show 
     * element 
     */
    autoShow(gobackSector, currentID) {
        const currentSector = currentID ? this.g('#' + currentID) : this.g('.art-md-show');

        // Store the id to look back for when tring to go back
        localStorage.setItem('md-back', currentSector.id);
        if (gobackSector) {
            gobackSector.classList.add('art-md-show');
            gobackSector.classList.remove('art-md-hide');
            gobackSector.classList.remove(gobackSector.getAttribute('tag-data'));
            gobackSector.classList.remove(gobackSector.getAttribute('tag-data-back'));

            currentSector.classList.remove('art-md-show');
            currentSector.classList.add('art-md-hide');
            currentSector.classList.add(currentSector.getAttribute('tag-data-back'));
        }
    }

    /** 
     * Existing Sectors.
     * 
     * Detecting the already existing Sectors during send element creation or when you call the write method the second time
     * This takes in the id parameter of the being created element and checks if there's an element already exists with that ID
     * @param id<String> This the element's id that is being created  
     * */
    existSector(id) {
        const alreadyThereModal = this.g('#' + id);
        alreadyThereModal.classList.add('art-md-show');
        alreadyThereModal.classList.remove('art-md-hide');
        alreadyThereModal.classList.remove(alreadyThereModal.getAttribute('tag-data'));
        alreadyThereModal.classList.remove(alreadyThereModal.getAttribute('tag-data-back'));
    }

    mlt(k) {
        let k_ = "";
        for (let i = 0; i < 100; i++) {

            k_ += k;
        }
        return k_
    }
};