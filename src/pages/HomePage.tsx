import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/index";
import {
  ExternalLinkIcon,
  Pencil2Icon,
  TrashIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import Navbar from "@/components/ui/navbar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { profileUser } from "@/redux/profile.slice";
import {
  deleteProduct,
  getDetailProduct,
  getProductList,
} from "@/redux/products.slice";
import { IProductItem } from "@/types";
import { Button } from "@/components/ui/button";
import DetailDialog from "@/components/dialogs/detail-dialog";
import FormDialog from "@/components/dialogs/form-dialog";
import { toast } from "@/components/ui/use-toast";
import Loading from "@/components/ui/loading";

function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: userData } = useSelector((state: RootState) => state.profile);
  const { data: productData, loading } = useSelector(
    (state: RootState) => state.products
  );
  const [formData, setFormData] = useState<IProductItem>({
    name: "",
    description: "",
    image: "",
    price: null,
  });

  const getData = async () => {
    await Promise.all([dispatch(profileUser()), dispatch(getProductList())]);
  };

  useEffect(() => {
    getData();
  }, [dispatch]);

  const onDetailProduct = async (id: number) => {
    await dispatch(getDetailProduct({ id }));
  };

  const onEditProduct = (item: any) => {
    setFormData(item);
  };

  if (loading) {
    return (
        <Loading />
    );
  }

  const onDeleteProduct = async (id: number) => {
    await dispatch(deleteProduct({ id })).then((response) => {
      if (
        response.meta.requestStatus === "fulfilled" &&
        response?.payload?.success
      ) {
        getData();

        toast({
          title: response.payload.message,
          variant: "success",
        });
      } else {
        toast({
          title: "Failed to delete Product",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="flex justify-center">
      <div className="w-2/3 h-screen ">
        <Navbar data={userData.data} />
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              Add Product <PlusIcon className="h-4 w-4 ml-2" />
            </Button>
          </DialogTrigger>
          <FormDialog />
        </Dialog>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead className="w-[100px]">Description</TableHead>
              <TableHead className="w-[100px]">Price</TableHead>
              <TableHead className="w-[150px]">Image</TableHead>
              <TableHead className="w-[250px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productData.data !== undefined &&
              productData.data.map((item: IProductItem, index: number) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>
                    <img
                      src={item.image}
                      alt={`product-image-${index}`}
                      width={100}
                      className="object-cover"
                    />
                  </TableCell>
                  <TableCell className="space-x-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          className="bg-blue-700 hover:bg-blue-500"
                          onClick={() => onDetailProduct(item.id as number)}
                        >
                          Detail <ExternalLinkIcon className="h-4 w-4 ml-2" />
                        </Button>
                      </DialogTrigger>
                      <DetailDialog />
                    </Dialog>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          className="bg-green-700 hover:bg-green-500"
                          onClick={() => onEditProduct(item)}
                        >
                          Edit <Pencil2Icon className="h-4 w-4 ml-2" />
                        </Button>
                      </DialogTrigger>
                      <FormDialog data={formData} />
                    </Dialog>
                    <Button
                      className="bg-red-700 hover:bg-red-500"
                      onClick={() => onDeleteProduct(item.id as number)}
                    >
                      Delete <TrashIcon className="h-4 w-4 ml-2" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default HomePage;
