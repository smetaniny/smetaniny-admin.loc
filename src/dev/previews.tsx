import { ComponentPreview, Previews } from "@react-buddy/ide-toolbox";
import { PaletteTree } from "./palette";
import { App } from "../App";
import RolesList from "../resource/roles/RolesList";
import RolesCreate from "../resource/roles/RolesCreate";
import PagesList from "../resource/pages/PagesList";

const ComponentPreviews = () => {
  return (
    <Previews palette={<PaletteTree />}>
      <ComponentPreview path="/PaletteTree">
        <PaletteTree />
      </ComponentPreview>
      <ComponentPreview path="/App">
        <App />
      </ComponentPreview>
      <ComponentPreview path="/RolesList">
        <RolesList />
      </ComponentPreview>
      <ComponentPreview path="/RolesCreate">
        <RolesCreate />
      </ComponentPreview>
      <ComponentPreview path="/PagesList">
        <PagesList />
      </ComponentPreview>
    </Previews>
  );
};

export default ComponentPreviews;
