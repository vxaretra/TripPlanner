import { Button, Card, Label, TextInput, Textarea } from "flowbite-react";
import { useFieldArray, useForm } from "react-hook-form";
import { auth, db } from "../lib/firebase";
import { addDoc, collection } from "firebase/firestore";

import CrossClose from "../assets/cross-close.svg";

export default function NewTripForm() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tripName: "",
      description: "",
      itineraries: [],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "itineraries",
  });

  const onSubmit = async (data) => {
    try {
      await addDoc(collection(db, "trips"), {
        tripName: data.tripName,
        description: data.description,
        itineraries: data.itineraries,
        userId: auth.currentUser.uid,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form
      className="flex flex-col max-w-xl gap-4 mx-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="max-w-xl">
        <div className="mb-2 block">
          <Label htmlFor="trip-name" value="Trip name" />
        </div>
        <TextInput
          id="trip-name"
          color={errors.tripName ? "failure" : "gray"}
          helperText={errors.tripName?.message}
          {...register("tripName", {
            required: "Please specify name for the trip.",
          })}
        />
      </div>
      <div className="max-w-xl">
        <div className="mb-2 block">
          <Label htmlFor="description" value="Trip description" />
        </div>
        <Textarea id="description" rows={4} {...register("description")} />
      </div>
      <Label value="Itineraries:" />
      {fields.map((field, idx) => {
        return (
          <ItineraryInputCard
            key={field.id}
            itineraryIdx={idx}
            errors={errors}
            control={control}
            register={register}
            deleteItinerary={() => {
              remove(idx);
            }}
          />
        );
      })}

      <Button
        className="w-fit m-auto"
        type="button"
        onClick={() => append({ cost: 0, places: [] })}
      >
        Add itinerary
      </Button>
      <Button type="submit">Submit</Button>
    </form>
  );
}

function ItineraryInputCard({
  itineraryIdx,
  control,
  register,
  errors,
  deleteItinerary,
}) {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `itineraries.${itineraryIdx}.places`,
  });

  return (
    <Card>
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">{`Day ${itineraryIdx + 1}`}</h1>
        <button
          className="w-8 h-8"
          type="button"
          size="xs"
          onClick={() => deleteItinerary()}
        >
          <img src={CrossClose} />
        </button>
      </div>
      <div>
        <TextInput
          addon="Rp."
          color={errors.itineraries?.[itineraryIdx]?.cost ? "failure" : "gray"}
          helperText={errors.itineraries?.[itineraryIdx]?.cost?.message}
          {...register(`itineraries.${itineraryIdx}.cost`, {
            required: "Must be a positive number.",
            pattern: {
              value: /^\d*\.?\d*$/,
              message: "Must be a positive number.",
            },
          })}
        ></TextInput>
      </div>
      <Label value="Places:" />
      {fields.map((field, idx) => {
        return (
          <div key={field.id}>
            <div className="flex">
              <TextInput
                className="grow"
                {...register(`itineraries.${itineraryIdx}.places.${idx}`, {
                  required: "Please specify your destination.",
                })}
              ></TextInput>
              <Button
                className="w-fit"
                type="button"
                onClick={() => remove(idx)}
              >
                X
              </Button>
            </div>
            {errors.itineraries?.[itineraryIdx]?.places?.[idx] && (
              <span className="text-sm text-red-600 dark:text-red-500">
                {errors.itineraries[itineraryIdx].places[idx].message}
              </span>
            )}
          </div>
        );
      })}
      <Button className="w-fit" type="button" onClick={() => append("")}>
        Add place
      </Button>
    </Card>
  );
}
