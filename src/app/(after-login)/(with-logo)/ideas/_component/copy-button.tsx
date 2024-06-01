import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
export default function CopyButton() {
  const { toast } = useToast();
  return (
    <Button
      variant='outline'
      onClick={() => {
        toast({
          title: 'Copied successfully to your categories',
        });
      }}
    >
      Copy
    </Button>
  );
}
