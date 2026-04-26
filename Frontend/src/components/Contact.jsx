import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useForm } from "react-hook-form";

function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    alert("Message sent successfully!");
  };

  return (
    <>
      <Navbar />
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 pt-28">
        <div className="flex h-full items-center justify-center">
            <div className="w-[600px] border shadow-md rounded-2xl p-8 dark:bg-slate-800 dark:border-slate-700">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="text-2xl font-bold text-center mb-6">Contact Us</h1>
                    <div className="space-y-4">
                        <div>
                            <span>Name</span>
                            <br />
                            <input
                                type="text"
                                placeholder="Enter your name"
                                className="w-full px-3 py-2 border rounded-md outline-none dark:bg-slate-900 dark:text-white"
                                {...register("name", { required: true })}
                            />
                            {errors.name && <span className="text-sm text-red-500">This field is required</span>}
                        </div>
                        <div>
                            <span>Email</span>
                            <br />
                            <input
                                type="email"
                                placeholder="Email address"
                                className="w-full px-3 py-2 border rounded-md outline-none dark:bg-slate-900 dark:text-white"
                                {...register("email", { required: true })}
                            />
                            {errors.email && <span className="text-sm text-red-500">This field is required</span>}
                        </div>
                        <div>
                            <span>Message</span>
                            <br />
                            <textarea
                                placeholder="Type your message"
                                className="w-full px-3 py-2 border rounded-md outline-none dark:bg-slate-900 dark:text-white h-32"
                                {...register("message", { required: true })}
                            />
                            {errors.message && <span className="text-sm text-red-500">This field is required</span>}
                        </div>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 duration-300">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Contact;
