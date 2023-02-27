import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-ingredients-form",
  templateUrl: "./ingredients-form.component.html",
  styleUrls: ["./ingredients-form.component.css"],
})
export class IngredientsFormComponent {
  form: FormGroup;
  @Output() add: EventEmitter<any> = new EventEmitter();

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      title: ["", [Validators.required]],
      type: ["", [Validators.required]],
    });
  }

  handleSubmit() {
    if (this.form.valid) {
      this.add.emit({
        title: this.form.get("title")?.value,
        type: this.form.get("type")?.value,
      });

      this.form.reset({
        title: "",
        type: "",
      });
    }
  }
}
