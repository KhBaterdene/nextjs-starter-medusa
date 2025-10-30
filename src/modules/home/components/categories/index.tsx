export default function Categories() {
  return (
    <div className="py-12 space-y-6 px-4">
      <h1 className="font-medium text-xl md:text-2xl md:content-container text-center">
        Та юу хайж байна вэ?
      </h1>
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-4 md:content-container">
        {[
          "Чийгшүүлэгч",
          "Цэвэрлэгч",
          "Eye & Lip",
          "Serums",
          "Toners",
          "Masks",
        ].map((category) => (
          <div key={category} className="space-y-2">
            <div className="bg-gray-100 rounded-lg aspect-square"></div>
            <h2 className="font-medium">{category}</h2>
          </div>
        ))}
      </div>
    </div>
  )
}
