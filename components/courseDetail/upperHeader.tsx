import stringSplitLine from "../../functions/stringSplitLine"

export default function UpperHeader({ header }: { header: string }) {
  const headerLocal = stringSplitLine(header)
  return (
    <div className="background-dark">
      <div className="row align-items-center justify-content-center">
        <div className="block-type-text text-left col-12">
          <div className="block box-shadow-none">
            {headerLocal.map((value, index) => {
              if (index <= 0) {
                return (
                  <h1 key={index} className="text-center">
                    <span className="color-primary">
                      <strong>
                        {value}
                      </strong>
                    </span>
                  </h1>
                )
              } else {
                return (
                  <h3 key={index} className="text-center">
                    <span className="color-smooth">
                      {value}
                    </span>
                  </h3>
                )
              }
            })}
          </div>
        </div>
      </div>
    </div>
  )
}