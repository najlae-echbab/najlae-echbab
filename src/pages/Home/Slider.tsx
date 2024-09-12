import React, { useMemo, useCallback } from "react";
import { getBrands, getEngine, getModelBrand } from "../../cor/_requests";
import flag from "../../../public/img/custom/flag.png";

import {
  BrandInterface,
  ModelBrandInterface,
  EngineInterface,
} from "../../cor/_models";
import { Link } from "react-router-dom";

const Slider = () => {
  const [brands, setBrands] = React.useState<BrandInterface[]>([]);
  const [brandSelected, setBrandSelected] = React.useState<number | undefined>(
    undefined
  );

  const [models, setModels] = React.useState<ModelBrandInterface[]>([]);
  const [modelSelected, setModelSelected] = React.useState<number | undefined>(
    undefined
  );
  const [engines, setEngines] = React.useState<EngineInterface[]>([]);
  const [engineSelected, setEngineSelected] = React.useState<number | undefined>(
    undefined
  );

  // get brands
  const getBrandList = async () => {
    try {
      const brandData = await getBrands("items=all");
      setBrands(brandData);
    } catch (error: unknown) {
      console.log(error);
    }
  };

  useMemo(() => {
    getBrandList();
  }, []);

  // Get models
  const getModelList = useCallback(async () => {
    try {
      if (brandSelected) {
        const brandData = await getModelBrand(
          "items=all&brand_id=" + brandSelected
        );
        setModels(brandData);
      }
    } catch (error: unknown) {
      console.log(error);
    }
  }, [brandSelected]);

  useMemo(() => {
    if (brandSelected) {
      getModelList();
    }
  }, [brandSelected, getModelList]);

  // Get engines
  const getEngineList = useCallback(async () => {
    try {
      if (modelSelected) {
        const engineData = await getEngine(
          "items=all&model_id=" + modelSelected
        );
        setEngines(engineData);
      }
    } catch (error: unknown) {
      console.log(error);
    }
  }, [modelSelected]);

  useMemo(() => {
    if (modelSelected) {
      getEngineList();
    }
  }, [modelSelected, getEngineList]);
  const changeBrand = async (id: number) => {
    await setModelSelected(undefined);
    await setEngineSelected(undefined);
    setBrandSelected(id);
  };
  const changeModel = async (id: number) => {
    await setEngineSelected(undefined);
    setModelSelected(id);
  };
  const changeEngine = async (id: number) => {
    setEngineSelected(id);
  };
  return (
    <div className="bg-[url('/img/custom/slide.png')] h-[90vh] flex-col-center p-4 bg-cover bg-no-repeat bg-center  ">
      <div className="grid grid-cols-12 gap-4 p-[2.5rem] rounded-xl bg-[url('/img/custom/zalij.png')]  w-full md:w-[80%] ">
        <div className=" col-span-12 lg:col-span-3">
          <select
            className="select"
            name="brands"
            aria-placeholder=""
            onChange={(e) => {
              changeBrand(Number(e.target.value));
            }}
            id="brands"
          >
            <option value={undefined}> Sélectionnez une marque</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-12 lg:col-span-3">
          <select
            name="model"
            id="model"
            className="select"
            onChange={(e) => changeModel(Number(e.target.value))}
          >
            <option value={undefined}> Sélectionnez un modèle</option>

            {models.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-12 lg:col-span-3">
          <select
            name="engines"
            id="engines"
            className="select"
            value={engineSelected}
            onChange={(e) => changeEngine(Number(e.target.value))}
          >
            <option value={undefined}> Sélectionnez un moteur</option>

            {engines.map((engine) => (
              <option key={engine.id} value={engine.id}>
                {engine.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-12 lg:col-span-3">
          <button className="btn-primary w-full">
            <Link
              to="/produits"
              state={{ brandSelected, modelSelected, engineSelected }}
              className=" w-full"
            >
              Recerche
            </Link>
          </button>
        </div>
      </div>
      <div>
        <p className="text-center text-white text-5xl text-font mt-10">
          Trouvez les pièces auto occasion dont vous avez besoin au Maroc{" "}
          <span>
            <img className="inline" src={flag} alt="flag" width={25} />
          </span>
          !
        </p>
      </div>
    </div>
  );
};

export default Slider;
