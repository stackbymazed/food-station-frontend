"use client"

import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type MealFormData = {
  title: string
  price: number
  image: string
  category: string
  description: string
}

export default function AddMealForm() {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<MealFormData>()

  const onSubmit = async (data: MealFormData) => {

    const loading = toast.loading("Adding meal...")

    try {

      console.log(data)

      // backend api call
      // await fetch("/api/meals", { method: "POST", body: JSON.stringify(data) })

      toast.success("Meal added successfully", { id: loading })

      reset()

    } catch (error) {

      toast.error("Something went wrong", { id: loading })

    }
  }

  return (

    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 border p-6 rounded-lg shadow-sm"
    >

      {/* Meal Title */}
      <div className="space-y-2">
        <Label>Meal Title</Label>

        <Input
          placeholder="Chicken Burger"
          {...register("title", { required: "Meal title is required" })}
        />

        {errors.title && (
          <p className="text-red-500 text-sm">
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Price */}
      <div className="space-y-2">
        <Label>Price</Label>

        <Input
          type="number"
          placeholder="10"
          {...register("price", { required: "Price is required" })}
        />

        {errors.price && (
          <p className="text-red-500 text-sm">
            {errors.price.message}
          </p>
        )}
      </div>

      {/* Image */}
      <div className="space-y-2">
        <Label>Image URL</Label>

        <Input
          placeholder="https://image-url.com"
          {...register("image", { required: "Image is required" })}
        />

        {errors.image && (
          <p className="text-red-500 text-sm">
            {errors.image.message}
          </p>
        )}
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label>Category</Label>

        <Input
          placeholder="Fast Food"
          {...register("category", { required: "Category is required" })}
        />

        {errors.category && (
          <p className="text-red-500 text-sm">
            {errors.category.message}
          </p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label>Description</Label>

        <Textarea
          placeholder="Write meal description..."
          {...register("description", { required: "Description is required" })}
        />

        {errors.description && (
          <p className="text-red-500 text-sm">
            {errors.description.message}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full">
        Add Meal
      </Button>

    </form>

  )
}