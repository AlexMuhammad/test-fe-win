import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/index";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateIcon } from "@radix-ui/react-icons";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  Dialog,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import type { IProductItem } from "@/types";
import { z } from "zod";
import { useEffect, useState } from "react";
import {
  createProduct,
  getProductList,
  updateProduct,
} from "@/redux/products.slice";
import { toast } from "../ui/use-toast";

interface IFormDialog extends IProductItem {
  userId?: number;
  createdAt?: string;
  updatedAt?: string;
}

const FormSchema = z.object({
  name: z.string().min(3, {
    message: "Name character minimal 5 character(s)",
  }),
  description: z.string().min(3, {
    message: "Desc character minimal 5 character(s)",
  }),
  image: z.string(),
  price: z.string().min(1, {
    message: "Please field price!",
  }),
});

const FormDialog = ({ data: productData }: { data?: IFormDialog }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { description, image, name, price } = productData || {};
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      description: "",
      image: "",
      price: "",
    },
  });
  const [isImageExist, setIsImageExist] = useState<boolean>(false);
  const [file, setFile] = useState<any>();

  useEffect(() => {
    if (productData) {
      form.setValue("name", name!, {
        shouldValidate: true,
      });
      form.setValue("description", description!, {
        shouldValidate: true,
      });
      form.setValue("price", price!, {
        shouldValidate: true,
      });
      form.setValue("image", image!);
      setIsImageExist(image! ? true : false);
    }
  }, [productData]);

  useEffect(() => {
    if (isImageExist) {
      setIsImageExist(image ? true : false);
    }
  }, [isImageExist]);

  console.log("image", image);

  const onSubmit = async (data: any) => {
    const { price, name, description } = data;
    if (!productData) {
      await dispatch(
        createProduct({
          name,
          description,
          price,
          file,
        })
      ).then((response) => {
        if (
          response.meta.requestStatus === "fulfilled" &&
          response?.payload?.success
        ) {
          dispatch(getProductList());
          toast({
            title: response.payload.message,
            variant: "success",
          });
        } else {
          toast({
            title: "Failed to Add Product",
            variant: "destructive",
          });
        }
      });
    } else {
      dispatch(
        updateProduct({
          name,
          description,
          price,
          file: isImageExist ? image : file,
          id: productData.id!,
        })
      ).then((response) => {
        if (
          response.meta.requestStatus === "fulfilled" &&
          response?.payload?.success
        ) {
          dispatch(getProductList());
          toast({
            title: response.payload.message,
            variant: "success",
          });
        } else {
          toast({
            title: "Failed to Add Product",
            variant: "destructive",
          });
        }
      });
    }
  };

  const onFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>
          {productData ? "Edit Product" : "Add Product"}
        </DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6 p-10 bg-white rounded-md"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} className="w-full" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Description"
                    {...field}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="Price" {...field} className="w-full" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isImageExist ? (
            <>
              <img src={image} alt="product-image" width={100} />
              <Button type="submit" onClick={() => setIsImageExist(false)}>
                Change Photo <UpdateIcon className="h-4 w-4 ml-2" />
              </Button>
            </>
          ) : (
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      placeholder="Image"
                      className="w-full"
                      onChange={onFileChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </DialogContent>
  );
};

export default FormDialog;
