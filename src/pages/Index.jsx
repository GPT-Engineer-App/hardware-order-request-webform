import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Select, Textarea, VStack, Heading, useToast } from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";

const Index = () => {
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
    // For demonstration purposes, we'll just show a toast message
    toast({
      title: "Order Submitted",
      description: "Your hardware order request has been submitted for approval.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });

    // Reset form data
    setFormData({
      employeeName: "",
      vendor: "",
      productID: "",
      quantity: "",
      notes: "",
    });
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
          <Select name="vendor" placeholder="Select vendor" value={formData.vendor} onChange={handleChange}>
            {/* Options should be populated from the list of vendors */}
            <option value="vendor1">Vendor 1</option>
            <option value="vendor2">Vendor 2</option>
            {/* ... other vendors */}
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Product ID</FormLabel>
          <Input type="text" name="productID" value={formData.productID} onChange={handleChange} />
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
