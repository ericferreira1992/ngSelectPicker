# ngSelectPicker
Library for Angular Js, with the purpose of selecting multiple options, being able to use filter or not, all this in a single component.

---

#### Result
![alt tag](https://s24.postimg.org/h77sja4ud/ng_Select_Picker.gif)

### Install (gitHub)
```
git clone https://github.com/ericferreira1992/ngSelectPicker
```
### What he does?
* Allows you to select more than one option;
* Allows filtering (optional);
* It has option "All";
* In the input the selected items between commas are displayed;

---

Attributes (optional)	| Description
---						| ---
`filtro`		        | With "true" or "false" enable and disable filter (ex .: ``` <selectpicker filtro="false"></selectpicker> ```).
`todos-nome`            | Name for option to select "All"(ex .: ``` <selectpicker todos-nome="All"></selectpicker> ```).

### Usage
**Include in header your Html**:
```html
  <link href="css/ngSelectPicker.min.css" rel="stylesheet" type="text/css"/>
  <script src="js/ngSelectPicker.min.js"></script>
```

### Example usage
#### HTML
```html
    <form ng-submit="sendForm()">
        <div class="form-group">
            <label>Sistema</label>
            <selectpicker ng-model="selectedFruits" filtro-nome="All">
                <option ng-repeat="f in fruits" value="{{f.id}}">{{f.name}}</option>
            </selectpicker>
        </div>
        <button>Send</button>
    </form>
```

:pray: [Donate to help](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=ericferreira1992%40gmail%2ecom&lc=BR&item_name=Eric%20Github&currency_code=BRL&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHosted)

:email: [Send email to support](ericferreira1992@gmail.com)