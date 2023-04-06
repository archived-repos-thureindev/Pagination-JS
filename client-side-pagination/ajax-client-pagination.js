/* PAGINATION */ 


/* page object */
function Page(data, limit=5) {
    // data is response json to the paginated. 
    // limit is total item limit in one page

    this.results = data;
    this.limit = limit;

    this.totalPages = Math.ceil(this.results.length / LIMIT);

    // current page number to disply // initiated as page 1
    this.pageNum = 1;
    
    this.paginate_content = () => {

        startIndex = (this.pageNum - 1) * this.limit;
        endIndex = this.pageNum * this.limit;

        return this.results.slice(startIndex, endIndex)
    }

    this.pageContent = this.paginate_content();

    this.previous = () => {
        if (this.pageNum > 1) {
            this.pageNum --;

            this.pageContent = this.paginate_content();
        }
    }
    
    this.next = () => {
        if (this.pageNum < this.totalPages) {
            this.pageNum ++;

            this.pageContent = this.paginate_content();
        }
    }

    this.goto = (page_num) => {
        if (page_num >= 1 || page_num <= this.totalPages) {
            this.pageNum = page_num;

            this.pageContent = this.paginate_content();
        }
    }
}