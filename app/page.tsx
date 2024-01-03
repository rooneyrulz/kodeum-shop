import Image from "next/image";
import { prisma } from "@/lib/db/prisma";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export default async function Home() {
  const product = await prisma.product.findMany({
    orderBy: { id: "desc" },
  });

  if (!product.length) return <div>No Products Available!</div>

  return (
    <div>
      <div className="hero rounded-xl bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <Image
            src={product[0].imageUrl}
            alt={product[0].name}
            width={400}
            height={800}
            className="w-full max-w-sm rounded-lg shadow-2xl"
            priority
          />
          <div>
            <h1 className="text-5xl font-bold">{product[0].name}</h1>
            <p className="py-6">{product[0].description}</p>
            <Link
              href={"/products/" + product[0].id}
              className="btn btn-primary"
            >
              Check it out
            </Link>
          </div>
        </div>
      </div>

      <div className="my-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {product.slice(1).map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
