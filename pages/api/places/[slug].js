import { replace } from '@/library/helpers'
const intPlaces = require('./data.json')

// Addeding slugs for the incoming jsonData Slugs

export default (req, res) => {
    const IntPlacesWithSlug = intPlaces.map(place => {
        const slug = replace(place.name, ' ', '-');
        place = {
            ...place,
            slug,
        }
        return place
    })
    // filter slug is query slug it will give us the single object as an array
    const intPlace = IntPlacesWithSlug.filter(place => place.slug === req.query.slug)

    res.status(200).json(intPlace)
}