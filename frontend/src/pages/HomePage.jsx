import ProductCard from "../components/ProductCard";
import { useProductStore } from "../store/product";
import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const {fetchProducts,products} = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log("products", products);
  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip="text"
          fontSize="30"
          fontWeight="bold"
          textAlign={"center"}
        >
          Current Products
        </Text>
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
          spacing={8}
          w="full"
          padding={10}
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}

        </SimpleGrid>

        
        {products.length === 0 && (
          <Text
          fontSize="xl"
          fontWeight="bold"
          textAlign={"center"}
          color="gray.600"
        >
          No products found{" "}
          <Link to={"/create"}>
            <Text
              as="span"
              color="blue.500 "
              _hover={{ textDecoration: "underline" }}
            >
              Create a new product
            </Text>
          </Link>
        </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
