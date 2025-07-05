import { Field, Form, Formik, ErrorMessage } from "formik";
import css from "./NoteForm.module.css";
import type { Tags } from "../../types/note";
import { createNote } from "../../lib/api";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Loader from "../Loader/Loader";
import ErrorText from "../ErrorMessage/ErrorMessage";

interface NoteFormProps {
    onClose: () => void;
};
interface FormValues {
    title: string;
    content: string;
    tag: Tags;
};

const NoteSchema = Yup.object().shape({
    title: Yup.string().min(3, "Min. of 3 symbols").max(50, "Max. characters 50").required("Title is required"),
    content: Yup.string().max(500, "Max. characters 500"),
    tag: Yup.string().oneOf(['Work', 'Personal', 'Meeting', 'Shopping', 'Todo'], "Invalid tag value").required("Select a note tag")
}
);

const initialValues: FormValues = { title: "", content: "", tag: "Todo" };


export default function NoteForm({ onClose }: NoteFormProps) {
    const queryClient = useQueryClient();
    const { mutate, isPending, isError } = useMutation({
        mutationFn: (noteData: FormValues) => createNote(noteData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
            onClose();
        }
    });
    const handleCreateTask = (values: FormValues) => {
        mutate(values);
    };
    return (
        <>
            <Formik initialValues={initialValues} onSubmit={handleCreateTask} validationSchema={NoteSchema} >
                <Form className={css.form}>
                    {isPending ? <Loader /> : <>
                        <div className={css.formGroup}>
                            <label htmlFor="title">Title</label>
                            <Field id="title" type="text" name="title" className={css.input} />
                            <ErrorMessage component="span" name="title" className={css.error} />
                        </div>

                        <div className={css.formGroup}>
                            <label htmlFor="content">Content</label>
                            <Field
                                as="textarea"
                                id="content"
                                name="content"
                                rows={4}
                                className={css.textarea}
                            />
                            <ErrorMessage component="span" name="content" className={css.error} />
                        </div>

                        <div className={css.formGroup}>
                            <label htmlFor="tag">Tag</label>
                            <Field as="select" id="tag" name="tag" className={css.select}>
                                <option value="Todo">Todo</option>
                                <option value="Work">Work</option>
                                <option value="Personal">Personal</option>
                                <option value="Meeting">Meeting</option>
                                <option value="Shopping">Shopping</option>
                            </Field>
                            <ErrorMessage component="span" name="tag" className={css.error} />
                        </div>

                        <div className={css.actions}>
                            <button type="button" className={css.cancelButton} onClick={onClose}>
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className={css.submitButton}
                                disabled={isPending ? true : false}
                            >
                                Create note
                            </button>
                        </div>
                        {isError && <ErrorText text="Please try again later..." />}
                    </>
                    }
                </Form>
            </Formik >
        </>
    );
};