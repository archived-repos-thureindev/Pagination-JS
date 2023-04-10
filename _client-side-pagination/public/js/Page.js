// item limit per page 
const LIMIT_PER_PAGE = 5;


/* page object */

export function Page (data=[], limit=LIMIT_PER_PAGE) {
    // data is response json to the paginated. 
    // limit is total item limit in one page

    this.data = data;
    this.limit = limit;

    this.totalPages = Math.ceil(this.data.length / this.limit);

    // current page number to disply // initiated as page 1
    this.pageNum = 1;
    this.pageContent = paginate_content(this.data, this.pageNum, this.limit);
    this.pageIndicator = page_indicator(this.pageNum, this.totalPages);

    this.previous = () => {
        if (this.pageNum > 1) {
            this.pageNum --;
            this.pageContent = paginate_content(this.data, this.pageNum, this.limit);
            this.pageIndicator = page_indicator(this.pageNum, this.totalPages);

            return this.pageContent;
        }
    }
    
    this.next = () => {
        if (this.pageNum < this.totalPages) {
            this.pageNum ++;
            this.pageContent = paginate_content(this.data, this.pageNum, this.limit);
            this.pageIndicator = page_indicator(this.pageNum, this.totalPages);

            return this.pageContent;
        }
    }

    this.goto = (page_num) => {
        if (page_num >= 1 || page_num <= this.totalPages) {
            this.pageNum = page_num;
            this.pageContent = paginate_content(this.data, this.pageNum, this.limit);
            this.pageIndicator = page_indicator(this.pageNum, this.totalPages);

            return this.pageContent;
        }
    }

    this.update_data = (data) => {
        this.data = data;
        this.totalPages = Math.ceil(this.data.length / this.limit);
        this.pageNum = 1;

        this.pageContent = paginate_content(this.data, this.pageNum, this.limit);
        this.pageIndicator = page_indicator(this.pageNum, this.totalPages);
    }
}

/* PAGINATION *** static funcs ***/
    
const paginate_content = (data, page_num, item_limit) => {

    const startIndex = (page_num - 1) * item_limit;
    const endIndex = page_num * item_limit;

    console.log(data);
    console.log(typeof(data));
    return data.slice(startIndex, endIndex);
}

const page_indicator = (page_num, total_pages) => {
    let line = [];
    const INDICATOR_LIMIT = 5;
    const PAGE_START = 1;

    let indicator = INDICATOR_LIMIT;
    let offset = 1;

    
    line.push(page_num);
    indicator --;
    
    while (indicator > 0) {

        const valid_right = (page_num + offset) <= total_pages;
        const valid_left = (page_num - offset) >= PAGE_START;

        if (valid_right) {
            line.push(page_num + offset);
            indicator --;
        }
        if (valid_left) {
            line.push(page_num - offset);
            indicator --;
        }
        offset ++;

        if (!(valid_right || valid_left)) {
            indicator = 0;
        }
    }

    return line;
}
