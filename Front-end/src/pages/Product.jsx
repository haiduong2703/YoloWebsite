import React, { useEffect, useState } from "react";

import Helmet from "../components/Helmet";
import Section, { SectionBody, SectionTitle } from "../components/Section";
import Grid from "../components/Grid";
import ProductCard from "../components/ProductCard";
import ProductView from "../components/ProductView";
import { getProductAPI, getProductBySlug } from "../api/product";
import { getProductById, getAllProduct } from "../api/api";

const Product = (props) => {
  const [product, setProduct] = useState(undefined);
  const [relatedProducts, setRelatedProducts] = useState([]);
  //console.log(props.match.params.slug);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    var list = await getAllProduct();
    const data = {
      id: props.match.params.id,
    };
    var productSlug = await getProductById(data);
    setProduct(productSlug);
    setRelatedProducts(list);
  };

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [product]);

  return (
    <Helmet>
      <Section>
        <SectionBody>
          <ProductView product={product} />
        </SectionBody>
      </Section>
      {/* <Section>
        <SectionTitle>Khám phá thêm</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {relatedProducts.map((item, index) => (
              <ProductCard
                key={index}
                img01={item.namePath[0]}
                img02={item.namePath[1]}
                name={item.name}
                price={Number(item.price)}
                id={item.id}
              />
            ))}
          </Grid>
        </SectionBody>
      </Section> */}
    </Helmet>
  );
};

export default Product;
