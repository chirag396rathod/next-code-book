import { PostData } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { usePostDeleteMutation } from "./mutation";
import { Button } from "../ui/button";
import LoadingButton from "../LoadingButton";

interface DeletePostDialogProps {
  post: PostData;
  open: boolean;
  onClose: () => void;
}

export default function DeletePostDialog(props: DeletePostDialogProps) {
  const mutation = usePostDeleteMutation();

  const handleOpenChange = (open: boolean) => {
    if (!open || !mutation.isPending) {
      props?.onClose();
    }
  };
  return (
    <Dialog open={props?.open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Post?</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to delete this post?
        </DialogDescription>
        <DialogFooter>
          <LoadingButton
            variant={"destructive"}
            onClick={() => mutation.mutate(props?.post?.id)}
            loading={mutation.isPending}
          >
            Delete
          </LoadingButton>
          <Button
            variant="outline"
            onClick={props?.onClose}
            disabled={mutation.isPending}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
