# Yeezy Vote!

We’re here to pay homage to our generation's most influential artist. What is Kanye's best song? You decide. 
Select your top 5 songs and submit your vote. Check back to see how your favorites stack up against the ultimate ranking of Kanye's genius.

Find any bugs? Want to add tracks? Please log your issues [here](https://github.com/danielduhh/kanye-goat/issues).



# Development
#### Install Dependencies

We have three kinds of dependencies in this project: tools, database and angular framework code.  The tools help
us manage and test the application.

* Get the libraries we depend upon via `npm` & the angular code via `bower`
* Create the postgres DB via [1_build_db.sql](sql/sql/1_build_db)

We have preconfigured `npm` to automatically run `bower` simply run:

```
npm install
```

Two new folders will appear in your project

* `node_modules` - contains the npm packages for the tools we need
* `public/components` - contains the angular framework files

#### Create Postgres DB
* Run script [1_build_db.sql](app/sql/1_build_db.sql)
* Add [settings file](settings-example.js)

#### Run the Application

Run the web server

```
npm start
```

### Development
Watch for changes and build all js files into _public/app/build/kanye.min.js_

```
grunt build watch
```
