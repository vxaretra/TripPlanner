import { useState } from "react";
import { Button, Card, Label, TextInput, Textarea } from "flowbite-react";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import { auth, db } from "../lib/firebase";
import { addDoc, collection } from "firebase/firestore";

import TripFormMap from "./TripFormMap";

import CrossClose from "../assets/cross-close.svg";
import CrossBlack from "../assets/cross-black.svg";
import MapTag from "../assets/map-tag.svg";

export default function NewTripForm() {
  const methods = useForm({
    defaultValues: {
      name: "",
      description: "",
      itineraries: [{ cost: 0, places: [{ name: "", coordinate: null }] }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: "itineraries",
  });

  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showMap, setShowMap] = useState(false);

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
    <FormProvider
      {...methods}
      removeItinerary={remove}
      setShowMap={setShowMap}
      selectedPlace={selectedPlace}
      setSelectedPlace={setSelectedPlace}
    >
      <form
        className="flex flex-col max-w-xl gap-4 mx-auto"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Trip name" />
          </div>
          <Controller
            control={methods.control}
            name="name"
            rules={{ required: "Please specify name for the trip." }}
            render={({
              field: { onChange, onBlur },
              fieldState: { error },
            }) => (
              <TextInput
                id="trip-name"
                onChange={onChange}
                onBlur={onBlur}
                color={error ? "failure" : "gray"}
                helperText={error?.message}
              />
            )}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="description" value="Trip description" />
          </div>
          <Controller
            control={methods.control}
            name="description"
            render={({ field: { onChange, onBlur } }) => (
              <Textarea
                id="trip-description"
                rows={4}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
        </div>
        <Label value="Itineraries:" />
        {fields.map((field, idx) => (
          <ItineraryInputCard key={field.id} itineraryIdx={idx} />
        ))}
        <Button
          className="w-fit m-auto"
          type="button"
          onClick={() => append({ cost: 0, places: [] })}
        >
          Add itinerary
        </Button>
        <Button type="submit">Submit</Button>
      </form>
      <TripFormMap show={showMap} setShow={setShowMap} />
    </FormProvider>
  );
}

function ItineraryInputCard({ itineraryIdx }) {
  const { control, removeItinerary, setShowMap, setSelectedPlace } =
    useFormContext();
  const { fields, remove, append } = useFieldArray({
    control: control,
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
          onClick={() => removeItinerary(itineraryIdx)}
        >
          <img src={CrossClose} />
        </button>
      </div>
      <Controller
        control={control}
        name={`itineraries.${itineraryIdx}.cost`}
        rules={{
          required: "Must be a positive number.",
          pattern: {
            value: /^\d*\.?\d*$/,
            message: "Must be a positive number.",
          },
        }}
        render={({ field: { onChange, onBlur }, fieldState: { error } }) => (
          <TextInput
            addon="Rp."
            onChange={onChange}
            onBlur={onBlur}
            color={error ? "failure" : "gray"}
            helperText={error?.message}
          />
        )}
      />
      <Label value="Places:" />
      {fields.map((field, idx) => (
        <div key={field.id}>
          <div className="flex gap-4">
            <Controller
              control={control}
              name={`itineraries.${itineraryIdx}.places.${idx}.name`}
              render={({ field: { onBlur, onChange, value } }) => (
                <TextInput
                  className="grow"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
            <button type="button">
              <img
                className="h-8 w-8"
                src={MapTag}
                onClick={() => {
                  setSelectedPlace(`itineraries.${itineraryIdx}.places.${idx}`);
                  setShowMap(true);
                }}
              />
            </button>
            <button type="button" onClick={() => remove(idx)}>
              <img className="h-8 w-8" src={CrossBlack} />
            </button>
          </div>
        </div>
      ))}
      <Button
        className="w-fit"
        type="button"
        onClick={() => append({ name: "", coordinate: null })}
      >
        Add place
      </Button>
    </Card>
  );
}
