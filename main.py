from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root@localhost/website'#Direccion de la base de datos
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

#modelo de datos
class suppliers(db.Model):
    idsupplier = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    location = db.Column(db.String(120), nullable=False)

@app.route('/')
def cargar_formulario():
    return render_template('formulario.html')

@app.route('/guardar_formulario', methods=['POST'])
def guardar_formulario():
    datos = request.get_json()

    id_supplier  = datos.get('cedula','')

    usuario_existente = suppliers.query.filter_by(idsupplier=id_supplier).first()

    if usuario_existente:
        respuesta = True
    else:
        nuevo_supplier = suppliers(idsupplier=datos['cedula'], name=datos['nombre'], location=datos['ubicacion'])
        db.session.add(nuevo_supplier)
        db.session.commit()
        respuesta = False

    

    return jsonify({'existeUsuario': respuesta})


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=8000)