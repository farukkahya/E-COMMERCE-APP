import React from "react";
import moment from "moment";
import { Image, Button, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
function Card({item}) {
  return (
    <Box borderWidth={"1px"} borderRadius={"lg"} overflow="hidden" p="3">
      <Link to={`/products/${item.id}`}>
        <Image src={item.photos[0]} alt="product" loading="lazy" />
        <Box p={"6"}>
          <Box d="plex" alignItems={"baseline"}>
            {moment(item.createdAt).format("DD.MM.YYYY")}
          </Box>
          <Box mt={"1"} fontWeight="semibold" as="h4" lineHeight={"tight"}>
            {item.title}
          </Box>
          <Box>
            {item.price} TL
          </Box>
        </Box>
      </Link>
      <Button colorScheme={'orange'} className='button'><FontAwesomeIcon icon={faCartPlus}/><span style={{marginLeft:'5px'}}>Add to Cart</span></Button>
    </Box>
  );
}

export default Card;
