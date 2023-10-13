/* How to use:
    {% scrollybox %}
        <li>item1</li>
        <li>item2</li>
    {% endscrollybox %}
    remember that each li element should have a fixed width of 200px
    also to have the box centered we can have it in a div that is centered using automatic margin and setting a specific width
    so an example with all of this would be:
    <style>
        .scrollyBox .container img{
            width: 200px;
        }
        .bigger-container{
            margin-left: auto;
            margin-right: auto;
            width: 520px;
        }
    </style>
    <div class="bigger-container">
        {% scrollybox %}
        <li><img src=""></img></li>
        <li><img src=""></img></li>
        <li><img src=""></img></li>
        <li><img src=""></img></li>
        <li><img src=""></img></li>
        {% endscrollybox %}
    </div>
*/

module.exports = function(content) {
    return `
    <div class="scrollyBox">
        <button class="bwd_button">
            <img src="https://1001freedownloads.s3.amazonaws.com/vector/thumb//Soeb_Plain_Arrows_4.png" width="20" height="20">
        </button>
        <div class="extCont">
            <ol class="container">
                ${content}
            </ol>
        </div>  
        <button class="fwd_button">
            <img src="https://1001freedownloads.s3.amazonaws.com/vector/thumb//Soeb_Plain_Arrows_5.png" width="20" height="20">
        </button>
    </div>`
}
