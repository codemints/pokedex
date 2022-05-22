import { FilterType, FilterSearch, FilterSort, FilterQuantity } from '@comps'

const Controls = () => {
  return (
    <section className="filters">
      <div className="filters__wrapper">
        <FilterType/>
        <FilterSearch/>
        <FilterSort/>
        <FilterQuantity/>
      </div>
    </section>
  )
}

export default Controls