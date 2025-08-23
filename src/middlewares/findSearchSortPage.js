import { Op } from 'sequelize'

export default (req, res, next) => {
  // --- FILTERING ---
  // /?filter[roomNumber]=101&filter[guestName]=Ali
  const filter = req.query?.filter || {}

  // --- SEARCHING (case-insensitive, Postgres iLike) ---
  // /?search[guestName]=mehmet
  const search = req.query?.search || {}
  const searchWhere = {}
  for (const key in search) {
    // iLike sadece Postgres'te çalışır; MySQL kullanırsan Op.substring kullanabilirsin.
    searchWhere[key] = { [Op.iLike]: `%${search[key]}%` }
  }

  // --- SORTING ---
  // /?sort[guestName]=asc&sort[checkIn]=desc
  const sort = req.query?.sort || {}
  const order = Object.entries(sort).map(([k, v]) => [k, ('' + v).toUpperCase() === 'DESC' ? 'DESC' : 'ASC'])

  // --- PAGINATION ---
  // /?page=3&limit=10
  let limit = Number(req.query?.limit)
  limit = limit > 0 ? limit : Number(process.env.PAGE_SIZE || 20)

  let page = Number(req.query?.page)
  page = page > 0 ? (page - 1) : 0

  let skip = Number(req.query?.skip)
  const offset = skip > 0 ? skip : (page * limit)

  // Model’den liste ve detay çekecek yardımcılar:
  res.getModelList = async (Model, customWhere = {}, include = []) => {
    const where = { ...filter, ...searchWhere, ...customWhere }
    const { rows } = await Model.findAndCountAll({
      where,
      order: order.length ? order : undefined,
      limit,
      offset,
      include
    })
    return rows
  }

  res.getModelListDetails = async (Model, customWhere = {}) => {
    const where = { ...filter, ...searchWhere, ...customWhere }
    const { count } = await Model.findAndCountAll({ where })

    const totalPages = Math.ceil(count / limit) || 1
    const details = {
      filter,
      search,
      sort,
      skip: offset,
      limit,
      page: page + 1,
      pages: totalPages > 1 ? {
        previous: page > 0 ? page : false,
        current: page + 1,
        next: (page + 2) <= totalPages ? (page + 2) : false,
        total: totalPages
      } : false,
      totalRecords: count
    }
    return details
  }

  next()
}
