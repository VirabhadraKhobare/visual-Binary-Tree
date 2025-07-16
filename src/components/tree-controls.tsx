
"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Wand2 } from 'lucide-react';

const operationSchema = z.object({
  value: z.coerce.number().min(0, "Value must be a non-negative number.").max(999, "Value must be less than 1000."),
  direction: z.enum(["left", "right"]),
});

interface TreeControlsProps {
  onInsert: (value: number, direction: 'left' | 'right') => void;
  onClear: () => void;
  selectedNodeKey: number | null;
}

const TreeControls: React.FC<TreeControlsProps> = ({
  onInsert,
  onClear,
  selectedNodeKey,
}) => {
  const operationForm = useForm<z.infer<typeof operationSchema>>({
    resolver: zodResolver(operationSchema),
    defaultValues: { value: undefined, direction: "left" },
  });

  const handleInsert: SubmitHandler<z.infer<typeof operationSchema>> = (data) => {
    onInsert(data.value, data.direction);
    operationForm.reset({ value: undefined, direction: "left" });
  };
  
  const handleRandom = () => {
    const randomValue = Math.floor(Math.random() * 100);
    operationForm.setValue("value", randomValue);
    operationForm.clearErrors("value");
  };

  return (
      <Card>
        <CardHeader>
          <CardTitle>Operations</CardTitle>
          <CardDescription>
            {selectedNodeKey !== null 
              ? `Selected parent: ${selectedNodeKey}. Add a child.`
              : `Select a node to add a child or add a root node.`}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...operationForm}>
            <form
              onSubmit={operationForm.handleSubmit(handleInsert)}
              className="space-y-4"
            >
              <FormField
                control={operationForm.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Node Value</FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input type="number" placeholder="Enter a number" {...field} onChange={(e) => field.onChange(e.target.value === '' ? undefined : e.target.value)} />
                      </FormControl>
                      <Button type="button" variant="secondary" onClick={handleRandom} className="px-3">
                        <Wand2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={operationForm.control}
                name="direction"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Direction</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-x-4"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="left" />
                          </FormControl>
                          <FormLabel className="font-normal">Left</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="right" />
                          </FormControl>
                          <FormLabel className="font-normal">Right</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Insert Node
              </Button>
            </form>
          </Form>
          <div className="pt-4 border-t">
            <Button variant="destructive" onClick={onClear} className="w-full">
              Clear Tree
            </Button>
          </div>
        </CardContent>
      </Card>
  );
};

export default TreeControls;
