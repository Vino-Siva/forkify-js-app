import View from "./view.js";
import icons from "url:../../img/icons.svg";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    const currentPage = this._data.page;
    const previousPage = currentPage - 1;
    const nextPage = currentPage + 1;

    if (currentPage === 1 && numPages > 1)
      return this._generateMarkupPreview(nextPage, true);

    if (currentPage === numPages && numPages > 1)
      return this._generateMarkupPreview(previousPage);

    if (1 < currentPage < numPages)
      return this._generateMarkupPreview([previousPage, nextPage]);

    return "";
  }

  _generateMarkupPreview(page, nextPage = false) {
    const leftMarkup = `
      <button data-goto="${page}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${page}</span>
      </button>
    `;
    const rightMarkup = `
      <button data-goto="${page}" class="btn--inline pagination__btn--next">
        <span>Page ${page}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;

    if (Array.isArray(page))
      return `
        <button data-goto="${page[0]}" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${page[0]}</span>
        </button>
        <button data-goto="${page[1]}" class="btn--inline pagination__btn--next">
        <span>Page ${page[1]}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right
          "></use>
        </svg>
        </button>
    `;
    if (nextPage) return rightMarkup;

    return leftMarkup;
  }
}

export default new PaginationView();
