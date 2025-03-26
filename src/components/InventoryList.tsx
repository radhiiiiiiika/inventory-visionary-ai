
import { useState } from "react";
import { motion } from "framer-motion";
import { Package2, Search, Plus, Trash2, Edit, AlertTriangle, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

// Sample inventory data
const mockInventoryItems = [
  { id: 1, name: "Office Chair", category: "Furniture", quantity: 86, status: "In Stock" },
  { id: 2, name: "Desk Lamp", category: "Electronics", quantity: 42, status: "In Stock" },
  { id: 3, name: "Notebook Pack", category: "Office Supplies", quantity: 128, status: "In Stock" },
  { id: 4, name: "Wireless Keyboard", category: "Electronics", quantity: 36, status: "In Stock" },
  { id: 5, name: "Wireless Mouse", category: "Electronics", quantity: 24, status: "Low Stock" },
  { id: 6, name: "USB-C Cable", category: "Electronics", quantity: 15, status: "Low Stock" },
  { id: 7, name: "Whiteboard Markers", category: "Office Supplies", quantity: 0, status: "Out of Stock" },
  { id: 8, name: "Conference Table", category: "Furniture", quantity: 5, status: "Low Stock" },
  { id: 9, name: "Headphones", category: "Electronics", quantity: 0, status: "Out of Stock" },
  { id: 10, name: "Filing Cabinet", category: "Furniture", quantity: 12, status: "In Stock" },
];

export const InventoryList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [inventory, setInventory] = useState(mockInventoryItems);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editValues, setEditValues] = useState({ name: "", category: "", quantity: 0 });

  const filteredItems = inventory.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "Low Stock":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "Out of Stock":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const openEditDialog = (item: any) => {
    setSelectedItem(item);
    setEditValues({ 
      name: item.name, 
      category: item.category, 
      quantity: item.quantity 
    });
    setIsEditDialogOpen(true);
  };

  const handleDeleteItem = (id: number) => {
    setInventory(prev => prev.filter(item => item.id !== id));
    toast.success("Item removed from inventory");
  };

  const handleSaveEdit = () => {
    if (selectedItem) {
      setInventory(prev => 
        prev.map(item => 
          item.id === selectedItem.id 
            ? {
                ...item,
                name: editValues.name,
                category: editValues.category,
                quantity: editValues.quantity,
                status: editValues.quantity > 30 
                  ? "In Stock" 
                  : editValues.quantity > 0 
                    ? "Low Stock" 
                    : "Out of Stock"
              } 
            : item
        )
      );
      
      setIsEditDialogOpen(false);
      toast.success("Inventory item updated");
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex items-center relative w-full sm:w-auto max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search inventory..."
            className="pl-10 pr-4"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        
        <div className="flex space-x-2 w-full sm:w-auto">
          <Button variant="outline" className="rounded-full">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button className="rounded-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {filteredItems.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.map((item) => (
                    <TableRow key={item.id} className="transition-colors hover:bg-muted/30">
                      <TableCell className="font-medium flex items-center gap-2">
                        <Package2 className="w-4 h-4 text-muted-foreground" />
                        {item.name}
                      </TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`${getStatusColor(item.status)}`}>
                          {item.status === "Low Stock" && <AlertTriangle className="w-3 h-3 mr-1" />}
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => openEditDialog(item)}
                            className="size-8"
                          >
                            <Edit className="size-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDeleteItem(item.id)}
                            className="size-8 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8">
              <div className="p-3 rounded-full bg-muted mb-4">
                <Package2 className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No items found</h3>
              <p className="text-muted-foreground text-center max-w-md mb-4">
                {searchTerm 
                  ? `No items matching "${searchTerm}" were found in your inventory.` 
                  : "Your inventory is empty. Add some items to get started."}
              </p>
              <Button className="rounded-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </Button>
            </div>
          )}
        </div>
      </motion.div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Inventory Item</DialogTitle>
            <DialogDescription>
              Make changes to your inventory item here.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={editValues.name}
                onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Input
                id="category"
                value={editValues.category}
                onChange={(e) => setEditValues({ ...editValues, category: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Quantity
              </Label>
              <Input
                id="quantity"
                type="number"
                value={editValues.quantity.toString()}
                onChange={(e) => setEditValues({ ...editValues, quantity: parseInt(e.target.value) || 0 })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
