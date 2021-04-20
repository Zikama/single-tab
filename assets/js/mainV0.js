const g = k => document.querySelector(k);
const gA = k => document.querySelectorAll(k);

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
                    const target = artdefault;
                    const gobackSector = g('#' + target.getAttribute('md-data'));
                    this.initialShow(gobackSector);
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
            // <button class="art-btn-no-mt art-btn art-md-options waves-effect waves-ripple" id="${id}_options">...</button>
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
        const currentSector = currentID ? this.g('#' + currentID) : this.g('.art-md-show');

        console.log(currentSector);
        // Store current showing md element's id to the local storage to be used late  
        // localStorage.setItem('md-back', currentSector.id);

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


    autoShow(gobackSector, currentID) {
        const currentSector = currentID ? this.g('#' + currentID) : this.g('.art-md-show');

        // Store the id to look back for when tring to go back
        localStorage.setItem('md-back', currentSector.id);

        gobackSector.classList.add('art-md-show');
        gobackSector.classList.remove('art-md-hide');
        gobackSector.classList.remove(gobackSector.getAttribute('tag-data'));
        gobackSector.classList.remove(gobackSector.getAttribute('tag-data-back'));

        currentSector.classList.remove('art-md-show');
        currentSector.classList.add('art-md-hide');
        currentSector.classList.add(currentSector.getAttribute('tag-data-back'));
    }

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

const GoHome = g('#art-home');
const mD = new MD();

function goHome(e) {
    const options = {
        id: 'home-sector',
        header: '<b>My Header</b>',
        content: `<div class="art-card-sector ">
                        <div id="art-anoter" class="art-card waves-effect waves-ripple">
                        orem ipsum dolor, sit amet consectetur adipisicing elit. Molestias vitae obcaecati
                    </div>
                    </div>`,
        footer: `<b>My footer</b>`

    }

    mD.write(options,
        (id) => {
            const to_anoter = g('#art-anoter');
            to_anoter.addEventListener('click', () => {

                const options = {
                    id: 'home-sector2',
                    header: '<b>My Header2</b>',
                    content() {
                        return `<div class="art-card-sector ">
                            <div id="art-anoter2" class="art-card waves-effect waves-ripple">
                                orem ipsum dolor, sit amet consectetur adipisicing elit. Molestias vitae obcaecati
                            </div>
                            <div id="art-anoter4" class="art-card waves-effect waves-ripple">
                                orem ipsum dolor, sit amet consectetur adipisicing elit. Molestias vitae obcaecati
                            </div>
                            </div>`
                    }
                };
                mD.write(options);
            })

        });

}
const to_anoter = g('#art-anoter');
to_anoter.addEventListener('click', () => {

    const options = {
        id: 'home-sector2',
        header: '<b>My Header25</b>',
        content() {
            return `<div class="art-card-sector ">
                        <div id="art-anoter2" class="art-card waves-effect waves-ripple">
                            orem ipsum dolor, sit amet consectetur adipisicing elit. Molestias vitae obcaecati
                        </div>
                        <div id="art-anoter4" class="art-card waves-effect waves-ripple">
                            orem ipsum dolor, sit amet consectetur adipisicing elit. Molestias vitae obcaecati
                        </div>
                    </div>`
        }
    };

    mD.write(options);
})


// GoHome.addEventListener('click', goHome)