import { Button, Card, Label, TextInput, Textarea } from "flowbite-react";
import { useFieldArray, useForm } from "react-hook-form";
import { db } from "../lib/firebase";
import { addDoc, collection } from "firebase/firestore";

function ItineraryInputCard({
  itineraryIdx,
  control,
  register,
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
        <Button
          className="w-fit"
          type="button"
          size="xs"
          onClick={() => deleteItinerary()}
        >
          X
        </Button>
      </div>
      <div className="flex items-center">
        <TextInput
          addon="Rp."
          pattern="^\d*\.?\d*$"
          {...register(`itineraries.${itineraryIdx}.cost`, {
            pattern: /^\d*\.?\d*$/,
            setValueAs: v => parseFloat(v),
          })}
        ></TextInput>
      </div>
      <Label value="Places:" />
      {fields.map((field, idx) => {
        return (
          <div key={field.id} className="flex">
            <TextInput
              className="grow"
              required
              {...register(`itineraries.${itineraryIdx}.places.${idx}`)}
            ></TextInput>
            <Button className="w-fit" type="button" onClick={() => remove(idx)}>
              X
            </Button>
          </div>
        );
      })}
      <Button className="w-fit" type="button" onClick={() => append("")}>
        Add place
      </Button>
    </Card>
  );
}

export default function NewTripForm() {
  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      tripName: "",
      description: "",
      itineraries: [{ cost: 0, places: [] }],
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
          required
          {...register("tripName", { required: true })}
        />
      </div>
      <div className="max-w-xl">
        <div className="mb-2 block">
          <Label htmlFor="description" value="Trip description" />
        </div>
        <Textarea
          id="description"
          required
          rows={4}
          {...register("description", { required: true })}
        />
      </div>
      <Label value="Itineraries:" />
      {fields.map((field, idx) => {
        return (
          <ItineraryInputCard
            key={field.id}
            itineraryIdx={idx}
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
