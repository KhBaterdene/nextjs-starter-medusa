import { listCategories } from "@lib/data/categories"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Categories() {
  const product_categories = await listCategories()

  if (!product_categories) {
    return null
  }

  return (
    <div className="py-12 space-y-6 px-4">
      <h1 className="font-medium text-xl md:text-2xl md:content-container text-center">
        Та юу хайж байна вэ?
      </h1>
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-4 md:content-container">
        {product_categories.slice(0, 6).map((category) => (
          <LocalizedClientLink
            key={category.handle}
            href={`/categories/${category.handle}`}
          >
            <div className="space-y-2">
              <div className="bg-gray-100 rounded-lg aspect-square"></div>
              <h2 className="font-medium">{category.name}</h2>
            </div>
          </LocalizedClientLink>
        ))}
      </div>
    </div>
  )
}
