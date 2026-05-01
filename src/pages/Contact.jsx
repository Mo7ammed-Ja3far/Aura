import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';

export default function Contact() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    // Dummy submission
    console.log(data);
    alert("Message sent successfully!");
    reset();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact <span className="text-indigo-600">Us</span></h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          We are always here to help. Reach out to us for any queries or support.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Contact Info */}
        <div className="md:w-1/3 space-y-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Our Clinic</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-1">Address</p>
                <p className="text-gray-600">123 Health Avenue,<br/>Medical District, NY 10001</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-1">Phone</p>
                <p className="text-gray-600">+1 (555) 123-4567</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-1">Email</p>
                <p className="text-gray-600">support@aura-clinic.com</p>
              </div>
            </div>
            
            <hr className="my-6 border-gray-100" />
            
            <h3 className="text-lg font-bold text-gray-900 mb-4">Careers at Aura</h3>
            <p className="text-gray-600 mb-4 text-sm">Learn more about our teams and job openings.</p>
            <Button variant="outlined" className="!rounded-full !normal-case !text-indigo-600 !border-indigo-200">
              Explore Jobs
            </Button>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:w-2/3">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Full Name</label>
                  <TextField fullWidth size="small" {...register('name', { required: true })} />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Email Address</label>
                  <TextField fullWidth size="small" type="email" {...register('email', { required: true })} />
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">Subject</label>
                <TextField fullWidth size="small" {...register('subject', { required: true })} />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Message</label>
                <TextField 
                  fullWidth 
                  multiline 
                  rows={4} 
                  {...register('message', { required: true })} 
                />
              </div>

              <Button 
                type="submit" 
                variant="contained" 
                className="!bg-indigo-600 hover:!bg-indigo-700 !px-8 !py-3 !rounded-full !normal-case !shadow-none"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
