import { useSelector } from "react-redux";
import { RootState } from "../../redux/index";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";

const DetailDialog = () => {
  const { detailData: item } = useSelector(
    (state: RootState) => state.products
  );
  const { description, image, price, name } = item.data || {};

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{name}</DialogTitle>
        <img src={image} />
        <DialogDescription>{description}</DialogDescription>
        <DialogFooter>Rp.{price}</DialogFooter>
      </DialogHeader>
    </DialogContent>
  );
};

export default DetailDialog;
