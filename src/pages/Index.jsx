import React, { useState, useMemo } from "react";
import { Box, Button, FormControl, FormLabel, Input, Select, Textarea, VStack, Heading, useToast } from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";

const Index = () => {
  const vendorData = useMemo(
    () => ({
      vendor1: {
        name: "Vendor 1",
        products: [
          { itemID: "v1p1", name: "Product 1", price: 100, notes: "Product 1 notes" },
          { itemID: "v1p2", name: "Product 2", price: 150, notes: "Product 2 notes" },
        ],
      },
      vendor2: {
        name: "Vendor 2",
        products: [
          { itemID: "v2p1", name: "Product 1", price: 200, notes: "Product 1 notes" },
          { itemID: "v2p2", name: "Product 2", price: 250, notes: "Product 2 notes" },
        ],
      },
    }),
    [],
  );

  const handleVendorChange = (e) => {
    handleChange(e);
    const vendorProducts = vendorData[e.target.value]?.products || [];
    setFormData({
      ...formData,
      productID: vendorProducts.length > 0 ? vendorProducts[0].itemID : "",
    });
  };
  const [formData, setFormData] = useState({
    employeeName: "",
    vendor: "",
    productID: "",
    quantity: "",
    notes: "",
  });

  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Here you would normally send the data to AirTable API and setup the webhook

    const selectedProduct = formData.vendor ? vendorData[formData.vendor].products.find((product) => product.itemID === formData.productID) : undefined;

    if (selectedProduct) {
      const orderData = {
        ...formData,
        ...selectedProduct,
        quantity: Number(formData.quantity),
      };

      toast({
        title: "Order Submitted",
        description: "Your hardware order request has been submitted for approval.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      console.log("Order Data:", JSON.stringify(orderData));

      setFormData({
        employeeName: "",
        vendor: "",
        productID: "",
        quantity: "",
        notes: "",
      });
    } else {
      toast({
        title: "Submission Error",
        description: "There was an error with your submission. Please check the product information and try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={8}>
      <VStack spacing={4} as="form" onSubmit={handleSubmit}>
        <Heading>Hardware Order Request</Heading>

        <FormControl isRequired>
          <FormLabel>Employee Name</FormLabel>
          <Input type="text" name="employeeName" value={formData.employeeName} onChange={handleChange} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Vendor</FormLabel>
          <Select name="vendor" placeholder="Select vendor" value={formData.vendor} onChange={handleVendorChange}>
            {Object.entries(vendorData).map(([vendorID, { name }]) => (
              <option key={vendorID} value={vendorID}>
                {name}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Product ID</FormLabel>
          <Select name="productID" value={formData.productID} onChange={handleChange}>
            {formData.vendor &&
              vendorData[formData.vendor].products.map((product) => (
                <option key={product.itemID} value={product.itemID}>
                  {product.name}
                </option>
              ))}
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Quantity</FormLabel>
          <Input type="number" name="quantity" value={formData.quantity} onChange={handleChange} />
        </FormControl>

        <FormControl>
          <FormLabel>Additional Notes</FormLabel>
          <Textarea name="notes" value={formData.notes} onChange={handleChange} />
        </FormControl>

        <Button leftIcon={<FaPaperPlane />} colorScheme="blue" type="submit">
          Submit Request
        </Button>
      </VStack>
    </Box>
  );
};

export default Index;
