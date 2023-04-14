import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import { useRouter } from "next/router";

import Button from "./components/Button";
import { UserType } from "../types";
import { createUser, axiosFetcher, mockApiUrl, useGetUsers } from "./api";

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("Please enter first stam"),
  last_name: Yup.string().required("Please enter last name"),
  email: Yup.string().required("Please enter email"),
});

const intialValues: Omit<UserType, "id"> = {
  first_name: "",
  last_name: "",
  email: "",
  avatar: "",
};

export default function CreateUser() {
  const { users } = useGetUsers();
  const { data, error, mutate } = useSWR(mockApiUrl, axiosFetcher);

  async function handleSubmit(values: typeof intialValues) {
    try {
      const res = await createUser(mockApiUrl, values);
      console.log("Response:", res.data);

      // Update data using mutate
      mutate();
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="w-full">
      <p>Users count: {users?.length}</p>
      <br />
      <Link href={"/users"}>
        <Button className="p-3 rounded-md border">back to users</Button>
      </Link>
      <br />
      <br />
      <hr />
      <h1 className="mt-6 text-3xl font-bold mx-auto mb-8">Create User</h1>
      <br />
      <hr />

      <div className="overflow-hidden w-full h-full">
        <Formik
          enableReinitialize
          initialValues={intialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values }) => {
            return (
              <div className="text-left bg-white p-5 flex flex-row text-gray-800">
                <div className="grid grid-cols-2 gap-4 mx-auto">
                  <div className="flex flex-col max-w-2xl flex-shrink-0 mr-10 p-5">
                    {values?.avatar && (
                      <Image
                        className="max-w-sm"
                        alt="pic of user"
                        src={values?.avatar}
                        width={300}
                        height={300}
                      />
                    )}
                  </div>

                  <Form className="text-left flex flex-col text-gray-800 overflow-y-auto max-w-xl">
                    <section className="mb-4">
                      <label
                        htmlFor="first_name"
                        className="font-semibold text-sm text-gray-550"
                      >
                        Name *
                      </label>

                      <Field
                        id="first_name"
                        name="first_name"
                        type="text"
                        placeholder="Enter name"
                        className="mt-2 px-2 py-2 text-small w-full border border-gray-200 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-200"
                      />

                      <ErrorMessage
                        name="first_name"
                        component="div"
                        className="text-red-600 text-xs mt-1"
                      />
                    </section>

                    <section className="mb-4">
                      <label
                        htmlFor="last_name"
                        className="mb-1 font-semibold text-sm text-gray-550"
                      >
                        Last name *
                      </label>

                      <Field
                        id="last_name"
                        name="last_name"
                        type="text"
                        placeholder="Enter last name"
                        className="mt-2 px-2 py-2 text-small w-full border border-gray-200 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-200"
                      />

                      <ErrorMessage
                        name="last_name"
                        component="div"
                        className="text-red-600 text-xs mt-1"
                      />
                    </section>

                    <section className="mb-4">
                      <label
                        htmlFor="email"
                        className="mb-1 font-semibold text-sm text-gray-550"
                      >
                        Email *
                      </label>

                      <Field
                        id="email"
                        name="email"
                        type="text"
                        placeholder="Enter email"
                        className="mt-2 px-2 py-2 text-small w-full border border-gray-200 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-200"
                      />

                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-600 text-xs mt-1"
                      />
                    </section>

                    <section className="mb-4">
                      <label
                        htmlFor="avatar"
                        className="mb-1 font-semibold text-sm text-gray-550"
                      >
                        Image
                      </label>

                      <Field
                        id="avatar"
                        name="avatar"
                        type="text"
                        placeholder="Enter avatar"
                        className="mt-2 px-2 py-2 text-small w-full border border-gray-50 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-200"
                      />

                      <ErrorMessage
                        name="avatar"
                        component="div"
                        className="text-red-600 text-xs mt-1"
                      />
                    </section>

                    <section className="flex w-full justify-between">
                      <Button
                        // className={`${
                        //   isLoading ? "text-gray-500" : "text-gray-800"
                        // } rounded-md py-2 px-4 uppercase font-bold w-32`}
                        // disabled={isLoading}
                        type="submit"
                      >
                        {/* {isLoading ? "Saving..." : "Save"} */}
                        Save
                      </Button>
                    </section>
                  </Form>
                </div>
              </div>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
