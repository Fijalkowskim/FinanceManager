import React, { useEffect, useState } from "react";
import AddExpenseForm from "../components/add-expense/AddExpenseForm";
import { useParams } from "react-router-dom";
interface Props {
  planned?: boolean;
  edit?: boolean;
}
function AddExpense({ planned, edit }: Props) {
  const { id } = useParams();
  const [editId, setEditId] = useState<number>();
  useEffect(() => {
    if (edit && id) {
      try {
        setEditId(parseInt(id));
      } catch (err) {
        console.log(err);
      }
    }
  }, [id, edit]);
  return (
    <div className="min-h-screen flex items-start justify-center p-2 pt-20">
      <AddExpenseForm planned={planned} edit={edit} editId={editId} />
    </div>
  );
}

export default AddExpense;
