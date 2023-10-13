document.addEventListener('DOMContentLoaded', function(){
    //find containers
    const scrollyBoxesList =  document.getElementsByClassName('scrollyBox')

    // setup all scrolly boxes in the page
    for(let scrollyBox of scrollyBoxesList){
        initScrollybox(scrollyBox)
    }

    // function that dets up one single scrollybox
    function initScrollybox(scrollyBox){
        //find scrollybox buttons
        const fwd = scrollyBox.getElementsByClassName("fwd_button")[0]
        const bwd = scrollyBox.getElementsByClassName("bwd_button")[0]
        // findbyclassname returns an array, so we nned 1st item
        // this is the internal container inside the scrollybox
        const intCont = scrollyBox.getElementsByClassName("container")[0]

        itemsSetUp()
        initButtons()
        

        function itemsSetUp(){
            //find all ordered list items
            const items = intCont.getElementsByTagName("li")

            var order = 1

            //assigns initial order
            for (let item of items){
                item.style.order = order
                order++
            }
        }

        function fwdclick(){
            if(isInTransition()){
                // don't do anything if the items are already scrolling
                return;
            }
            // set up code to execute after the css animation has finished
            intCont.addEventListener("transitionend", onTransitionEndFwd)
            //apply CSS movement (animation linked to movement)
            intCont.classList.add("animation", "fwdMove")
        }

        function bwdclick(){
            if(isInTransition()){
                // don't do anything if the items are already scrolling
                return;
            }
            //    Apply CSS movement
            changeOrderBwd()
            intCont.classList.remove('animation')
            intCont.classList.add('fwdMove')
            void(intCont.offsetHeight) //Forces browser to apply fwdMove class before adding animation - forces CSS reflow
            intCont.classList.add('animation')
            intCont.classList.remove('fwdMove')
        }

        function onTransitionEndFwd(){
            const items = intCont.getElementsByTagName("li")
            
            for (let item of items){
                item.style.order--

                if (item.style.order==0){
                    item.style.order = items.length
                }
            }
            intCont.classList.remove("animation","fwdMove")
            intCont.removeEventListener("transitionend", onTransitionEndFwd)
        }

        function changeOrderBwd(){
            const items = intCont.getElementsByTagName("li")
            
            for (let item of items){
                item.style.order++

                if (item.style.order > items.length){
                    item.style.order = 1
                }
            }

        }

        function initButtons(){
            //init buttons
            fwd.addEventListener("click", fwdclick)
            bwd.addEventListener("click", bwdclick)

        }

        let isInTransition = function(){
            let isInTransitionProperty = false;
            intCont.addEventListener("transitionrun", function(){
                isInTransitionProperty = true
            })
            intCont.addEventListener("transitionend", function(){
                isInTransitionProperty = false
            })

            return function(){
                return isInTransitionProperty
            }
        }()

    }

}, false);