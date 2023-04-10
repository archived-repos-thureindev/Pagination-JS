import { Page } from "./Page.js";

// DOM element
const FORM_SELECTOR = 'form#ajax-form';
const TEXT_FIELD_SELECTOR = 'input[name=field_name]';


// ---------------------------------------
const DISPLAY_GROUP = '#paginated-display';
const DISPLAY_PAGE_NUM = '#page-num';
const DISPLAY_CONTENT = '#page-content';
const BTN_PREV = '#page-previous';
const BTN_NEXT = '#page-next';

// ---------------------------------------
const PAGE = new Page();
// ---------------------------------------

$(document).ready(function(){

    $(DISPLAY_GROUP)
    .append(`
    <hr>
    <button id="${BTN_PREV.slice(1)}" type="button" class="btn btn-outline-info">Previous</button>
    
    <span id='${DISPLAY_PAGE_NUM.slice(1)}'>Page #</span>

    <button id="${BTN_NEXT.slice(1)}" type="button" class="btn btn-outline-info">Next</button>
    <hr>
    <div id='${DISPLAY_CONTENT.slice(1)}'>Content</div>`);
    
    $(BTN_PREV).on('click', show_previous);
    $(BTN_NEXT).on('click', show_next);


    $(FORM_SELECTOR).on('submit', function(e){
        e.preventDefault();

        const promptText = $(TEXT_FIELD_SELECTOR).val();

        console.log($(TEXT_FIELD_SELECTOR));

        $.ajax({
            type: 'get',
            url: '/ajax-route',
            data: {
                "promptField": "field_name",
                "promptText": promptText.trim()
            },
            dataType: 'json'
        })
        .done(function(res_data){

            // UPDATE PAGE OBJ
            PAGE.update_data(res_data.content);

            // // Display content
            display_paginated_content();
        });
    });
});

const display_paginated_content = () => {

    // clear display first
    // $(DISPLAY_PAGE_NUM).innerHTML = '';
    $(DISPLAY_CONTENT).innerHTML = '';
    
    //  //  update content
    let content_html = '';
    // prepare updated content 
    $.each(PAGE.pageContent, (index, item) => {
        content_html = content_html.concat(
        `<h3>${item.field}</h3>
        <p>${item.text}</p>
        `);
    });
    $(DISPLAY_CONTENT).html(content_html);

    //  //  update page num
    function compareNumbers(a, b) {
        return a - b;
      }
    PAGE.pageIndicator.sort((a, b) => a - b);
    console.log(PAGE.pageIndicator);


    // let page_num_html = "(" + PAGE.pageIndicator.join('_') + ")";
    let page_num_html = '';

    $.each(PAGE.pageIndicator, (index, item) => {
        page_num_html = page_num_html.concat(`<button 
        id="goto_page_${item}" 
        type="button" 
        class="btn btn-outline-${item == PAGE.pageNum? 'dark': 'info'}">
        ${item}</button>`);
    });

    $(DISPLAY_PAGE_NUM).html(page_num_html);

}

const show_next = () => {
    PAGE.next();
    display_paginated_content();
}

const show_previous = () => {
    PAGE.previous();
    display_paginated_content();
}

const show_goto_page = (num) => {
    PAGE.goto(num);
    display_paginated_content();
}
