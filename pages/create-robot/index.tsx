import * as React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import Button from "../components/Button";
import { RobotType } from "../../types";
import { createRobot } from "../api";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Please enter first stam"),
  email: Yup.string().required("Please enter email"),
});

const intialValues: RobotType = {
  name: "",
  email: "",
  avatar: "",
};

export default function CreateRobot() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  async function handleSubmit(values: typeof intialValues) {
    setIsLoading(true);

    const finalObj = {
      ...values,
      avatar: `https://robohash.org/${values.avatar}?set=set4`,
    };
    try {
      const res = await createRobot(finalObj);
      console.log("Response:", res.data);

      router.push("/robots");
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full">
      <br />
      <Link href={"/robots"}>
        <Button className="p-3 rounded-md border">back to robots</Button>
      </Link>
      <br />
      <hr />
      <h1 className="mt-6 text-3xl font-bold mx-auto mb-8">Create Robot</h1>
      <br />
      <hr />

      <div className="overflow-hidden w-full h-full">
        <Formik
          enableReinitialize
          initialValues={intialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors }) => {
            return (
              <div className="text-left bg-white p-5 flex flex-row text-gray-800">
                <div className="grid grid-cols-2 gap-4 mx-auto">
                  <div className="flex flex-col max-w-2xl flex-shrink-0 mr-10 p-5">
                    {values?.avatar && (
                      <Image
                        className="max-w-sm"
                        alt="pic of user"
                        src={`https://robohash.org/${values?.avatar}?set=set4 `}
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
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter name"
                        className="mt-2 px-2 py-2 text-small w-full border border-gray-200 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-200"
                      />

                      <ErrorMessage
                        name="name"
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
                        className={`p-3 rounded-md border ${
                          isLoading ? "text-gray-500" : "text-gray-800"
                        } rounded-md py-2 px-4 uppercase font-bold w-32`}
                        disabled={isLoading}
                        type="submit"
                      >
                        {isLoading ? "Saving..." : "Save"}
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
