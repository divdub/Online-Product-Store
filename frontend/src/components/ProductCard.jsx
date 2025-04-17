import { useProductStore } from "../store/product";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
  useColorModeValue,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  Input,
  ModalFooter,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const textColor = useColorModeValue("gray.800", "whiteAlpha.900");
  const bg = useColorModeValue("white", "gray.800");
  const { deleteProduct, updateProduct } = useProductStore();
  const toast = useToast();

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
} = useDisclosure();

const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
} = useDisclosure();
  const cancelRef = useRef();

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
    onClose(); // Close the dialog after deletion
  };

  const handleUpdateProduct = async (pid, updatedProduct) => {
         await updateProduct(pid, updatedProduct);
          onClose();
  }

  return (
    <>
      <Box
        shadow="lg"
        rounded={"lg"}
        overflow={"hidden"}
        transition={"all 0.3s ease-in-out"}
        _hover={{ transform: "scale(1.05)", shadow: "xl" }}
        bg={bg}
      >
        <Image
          src={product.image}
          alt={product.name}
          h={48}
          w="full"
          objectFit="cover"
        />
        <Box p={4}>
          <Heading as={"h3"} size="md" mb={2} color="white.700">
            {product.name}
          </Heading>
          <Text fontWeight={"bold"} fontSize={"xl"} color={textColor} mb={2}>
            ${product.price}
          </Text>
          <HStack spacing={2}>
            <IconButton icon={<EditIcon />} onClick={onEditOpen} colorScheme="blue" />
            <IconButton
              icon={<DeleteIcon />}
              onClick={onDeleteOpen} // Open the confirmation dialog
              colorScheme="red"
            />
          </HStack>
        </Box>
      </Box>

      {/* Confirmation Dialog */}
      <AlertDialog
        isOpen={isDeleteOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDeleteClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Product
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this product? This action cannot
              be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => handleDeleteProduct(product._id)}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
       <Modal isOpen={isEditOpen} onClose={onEditClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Product</ModalHeader>
            <ModalCloseButton />
             <ModalBody>
                <VStack spacing={4}>
                   <Input placeholder="Product Name" name="name" value={updatedProduct.name}
                       onChange={(e)=> setUpdatedProduct({...updatedProduct, name: e.target.value})} />

                   <Input placeholder="Price" name="price" type="Number" value={updatedProduct.price}
                     onChange={(e)=> setUpdatedProduct({...updatedProduct, price: e.target.value})} />

                   <Input placeholder="Image URL" name="image" value={updatedProduct.image}
                      onChange={(e)=> setUpdatedProduct({...updatedProduct, image: e.target.value})}/>
                   
                </VStack>
             </ModalBody>
             <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleUpdateProduct(product._id, updatedProduct)}
               >
                  Save
              </Button>
              <Button variant="ghost" onClick={onEditClose}>
                  Cancel
              </Button>
             </ModalFooter>

          </ModalContent>
       </Modal>
    </>
  );
};

export default ProductCard;