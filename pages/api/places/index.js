import { replace } from '@/library/helpers'
const intPlaces = require('./data.json')

export default (req, res) => {
  const IntPlacesWithSlug = intPlaces.map(place => {
    const slug = replace(place.name, ' ', '-');
    place = {
      ...place,
      slug,
    }
    return place
  })

  res.status(200).json(IntPlacesWithSlug)
}
