import toast from 'react-hot-toast';
import { Field, Form, Formik, FormikHelpers } from 'formik';

import styles from './SearchBar.module.css';

interface FormValues {
  query: string;
}

interface Props {
  onSubmit: (query: string) => void;
}

const initialValues: FormValues = { query: '' };

export default function SearchBar({ onSubmit }: Props) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        if (!values.query) {
          toast.error('Please enter the value in the search field');
          return;
        }
        onSubmit(values.query);
        actions.resetForm();
      }}
    >
      <Form className={styles.searchForm}>
        <Field
          className={styles.searchInput}
          name="query"
          type="search"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit">Search</button>
      </Form>
    </Formik>
  );
}
