import FilterType from '@comps/FilterType'
import FilterSearch from '@comps/FilterSearch'

const Controls = () => {
  return (
    <section className="filters">
      <div className="filters__wrapper">
        <FilterType/>
        <FilterSearch/>
      </div>
    </section>
  )
}

export default Controls