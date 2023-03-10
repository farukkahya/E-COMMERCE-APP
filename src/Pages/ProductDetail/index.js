import React from "react";
import moment from "moment";
import "animate.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Box, Text, Button, Grid } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

function ProductDetail() {
  const { product_id } = useParams();
  const { isLoading, error, data } = useQuery(["products", product_id], () =>
    fetch(`${process.env.REACT_APP_BASE_ENDPOINT}/products/${product_id}`).then(
      (res) => res.json()
    )
  );
  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  return (
    <div className="product-detail">
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        <Box>
          <Carousel showThumbs={false}>
            {data.photos.map((pic, key) => {
              return (
                <div key={key}>
                  <img src={pic} alt="" />
                </div>
              );
            })}
          </Carousel>
        </Box>
        <Box>
          <Text as={"h2"}>
            {data.brand}
            <Text
              display={"block"}
              as={"span"}
              ml="2px"
              fontSize="3xl"
              fontWeight="semibold"
            >
              {data.title}
            </Text>
          </Text>
          <Text as={"h4"} fontSize="xl" fontWeight={"medium"}>
            {data.price} TL
          </Text>
          <Text as={"h4"}>{data.description}</Text>
          <Text fontWeight={"thin"} as={"h4"}>
            {moment(data.createdAt).format("DD/MM/YYYY")}
          </Text>
          <Button mt={"1.5rem"} colorScheme={"orange"}>
            <FontAwesomeIcon icon={faCartPlus} />
            <span style={{ marginLeft: "5px" }}>Add to Cart</span>
          </Button>
        </Box>
      </Grid>
    </div>
  );
}

export default ProductDetail;
