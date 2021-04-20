const g = k => document.querySelector(k);
const gA = k => document.querySelectorAll(k);

class artModal {
    constructor() {}
    init(options) {

    }
    writeToSection(options) {}
    autoShow() {}
};

//  * @param options.back<String> is a string that defines the modal/document's back direction in transition
/** 
 * Template Function
 * @param options<Object> is an Object that contains the modal's data to be put into art-main-section
 * @param options.id<String> is a string that defines the modal/document's id art-main-modal
 * @param options.header<String> is a string that defines the modal/document's Title in header section
 * @param options.content<String/Function> is a string/function[that returns string] that is used as user defined content to be displayed in the modal/document's content section
 * @param options.footer<String/Function> is a String/function[that returns the content] data to be put into md-footer
 * @param cb is a function<Function> that is being called after the content are being inserted successfully
 * @param cb [id]<String> is a String of the inserted Modal
 * @returns String: the Modal's content
 **/
const template = (options = {}, cb = (id = "") => {}) => {
    const { id, header, content, footer } = options;
    let back;

    init();

    function init() {
        const thisModal = g('.art-md-show');

        if (thisModal) {
            back = thisModal.id;
            localStorage.setItem('md-back', thisModal.id);

            thisModal.classList.remove('art-md-show');
            thisModal.classList.add('art-md-hide');
            thisModal.classList.add(thisModal.getAttribute('tag-data'));
        }
    }

    const mainSection = g('.art-main-section');
    localStorage.setItem('md-showing', id);

    const mlt = k => {
        let k_ = "";
        for (let i = 0; i < 1; i++) {

            k_ += k;
        }
        return k_
    }

    /** 
     * This is used to initialize the back functionality after the Modal has successfully been inserted
     * @param currentID is a String of the current inserted Modal 
     **/
    function initializeBack(currentID) {
        const gobackBtn = g('#' + currentID + ' ' + '.art-md-back');

        const current_back = localStorage.getItem('md-back')

        localStorage.setItem('md-back', back);

        gobackBtn.addEventListener('click', (e) => {
            const gobackSector = g('#' + current_back);

            const currentSector = g('#' + currentID);

            gobackSector.classList.add('art-md-show');
            gobackSector.classList.remove('art-md-hide');
            gobackSector.classList.remove(gobackSector.getAttribute('tag-data'));
            gobackSector.classList.remove(gobackSector.getAttribute('tag-data-back'));

            currentSector.classList.remove('art-md-show');
            currentSector.classList.add('art-md-hide');
            currentSector.classList.add(currentSector.getAttribute('tag-data-back'));

        })
    }

    const tmp = `<div class="art-main-modal art-md-hide right" id="${id}" tag-data-back="right" tag-data="left">
                <!-- Section md header -->
                <div class="art-md-header">
                    <button class="art-btn-no-mt art-btn waves-effect waves-ripple art-md-back" id="${id}_back">Back</button>
                    <div class="art-js-header-content">${header}</div>
                    <button class="art-btn-no-mt art-btn art-md-options waves-effect waves-ripple" id="${id}_options">...</button>
                </div>
                <!-- Main js content  -->
                <div class="art-md-content">
                ${typeof content === "function" ?mlt(content()):typeof content === "string"?content:''}   
                </div>
                <div class="art-md-footer">
                ${typeof footer === "function" ?footer():typeof footer === "string"?footer:''}
                </div>
            </div>`;

    if (!g('#' + options.id)) {
        mainSection.insertAdjacentHTML('BeforeEnd', tmp);
        setTimeout(() => {
            const alreadyThereModal1 = g('#' + id);
            alreadyThereModal1.classList.add('art-md-show');
            alreadyThereModal1.classList.remove('art-md-hide');
            alreadyThereModal1.classList.remove(alreadyThereModal1.getAttribute('tag-data'));
            alreadyThereModal1.classList.remove(alreadyThereModal1.getAttribute('tag-data-back'));
        }, 20);
    } else {
        const alreadyThereModal = g('#' + options.id);
        alreadyThereModal.classList.add('art-md-show');
        alreadyThereModal.classList.remove('art-md-hide');
        alreadyThereModal.classList.remove(alreadyThereModal.getAttribute('tag-data'));
        alreadyThereModal.classList.remove(alreadyThereModal.getAttribute('tag-data-back'));

    }

    if (cb) {
        cb(id)
    }

    initializeBack(id);

    return tmp;
};

const GoHome = g('#art-home');

function goHome(e) {
    Promise.resolve((async() => {
        const options = {
            id: 'home-sector',
            header: '<b>My Header</b>',
        }

        await template({
                ...options,
                content: () => {
                    return `<div class="art-card-sector ">
                        <div id="art-anoter" class="art-card waves-effect waves-ripple">
                        orem ipsum dolor, sit amet consectetur adipisicing elit. Molestias vitae obcaecati
                    </div>
                    </div>`;
                },
                footer: () => {
                    return `<b>My footer</b>`;
                }
            },
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
                        },
                        footer() {
                            return `<b>My footer2</b>`;
                        }
                    };
                    template(options, (id) => {

                    });
                })

            });

    })());
}


GoHome.addEventListener('click', goHome)