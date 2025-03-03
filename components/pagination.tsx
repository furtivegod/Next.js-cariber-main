export default function Pagination({ page, pageCount }: { page: number, pageCount: number }) {
  if (!page) {
    page = 1
  }
  const totalPage: number[] = Array.from(Array(pageCount).keys())
  return (
    <div className={`pag ${totalPage.length <= 1 && "none"}`}>
      <a className={`pag-link pag-link-prev ${page <= 1 && "page-active disabled"}`}
        href={`?page=${page === 1 ? `1` : `${page - 1}`}`}>
        <i className="fa fa-arrow-left"></i>
      </a>
      {totalPage.map((value) => {
        return (
          <a key={`page-${value + 1}`}
            className={`pag-link pag-link-current ${page === value + 1 && "page-active disabled"}`}
            href={`?page=${value + 1}`}>{value + 1}</a>
        )
      })}
      <a className={`pag-link pag-link-next ${page >= totalPage.length && "page-active disabled"}`}
        href={`?page=${page === totalPage.length ? `${totalPage.length}` : `${page + 1}`}`}>
        <i className="fa fa-arrow-right"></i>
      </a>
    </div >
  )
}