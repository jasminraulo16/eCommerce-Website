from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from .models import Product, Cart, CartItem, Transaction
from .serializers import ProductSerializer, CartItemSerializer, UserSerializer, SimpleCartSerializer, CartSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from decimal import Decimal
import uuid
import paypalrestsdk
from django.conf import settings


BASE_URL = settings.REACT_BASE_URL

paypalrestsdk.configure({
    "mode": settings.PAYMENT_MODE,
    "client_id": settings.PAYPAL_CLIENT_ID,
    "client_secret": settings.PAYPAL_CLIENT_SECRET

})

# Create your views here.
@api_view(["GET"])
def products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(["POST"])
def add_item(request):
    try:
        cart_code = request.data.get("cart_code")
        product_id = request.data.get("product_id")

        cart, created = Cart.objects.get_or_create(cart_code=cart_code)
        product = Product.objects.get(id=product_id)

        cartitem, created = CartItem.objects.get_or_create(cart=cart, product=product)
        cartitem.quantity = 1
        cartitem.save()

        serializer = CartItemSerializer(cartitem)
        return Response({"data":serializer.data, "message":"Cartitem created successfully"}, status=201)
    
    except Exception as e:
        return Response({"error":str(e)}, status=400)
    

@api_view(['GET'])
def product_in_cart(request):
    cart_code = request.query_params.get("cart_code")
    product_id = request.query_params.get("product_id")

    cart = Cart.objects.get(cart_code=cart_code)
    product = Product.objects.get(id=product_id)

    product_exists_in_cart = CartItem.objects.filter(cart=cart, product=product).exists()
    return Response({'product_in_cart':product_exists_in_cart})


@api_view(['GET'])
def get_cart_stat(request):
    cart_code = request.query_params.get("cart_code")
    cart = Cart.objects.get(cart_code=cart_code, paid=False)
    serializer = SimpleCartSerializer(cart)
    return Response(serializer.data)


@api_view(['GET'])
def get_cart(request):
    cart_code = request.query_params.get("cart_code")
    cart = Cart.objects.get(cart_code=cart_code, paid=False)
    serializer = CartSerializer(cart)
    return Response(serializer.data)


@api_view(['PATCH'])
def update_quantity(request):
    try:
        cartitem_id = request.data.get("item.id")
        quantity = request.data.get("quantity")
        quantity = int(quantity)
        cartitem = CartItem.objects.get(id=cartitem_id)
        cartitem.quantity = quantity
        cartitem.save()
        serializer = CartItemSerializer(cartitem)
        return Response({"data":serializer.data, "message": "Cartitem updated successfully!"})
    except Exception as e:
        return Response({'error':str(e)}, status=400)


@api_view(['DELETE'])
def delete_cartitem(request):
    cartitem_id = request.data.get("item_id")
    cartitem = CartItem.objects.get(id=cartitem_id)
    cartitem.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_username(request):
    user = request.user
    return Response({"username": user.username})



@api_view(["GET"])
@permission_classes([IsAuthenticated])
def user_info(request):
    user = request.user
    serializer = UserSerializer(user)
    return Response(serializer.data)


@api_view(['POST'])
def initiate_paypal_payment(request):
    if request.method == 'POST' and request.user.is_authenticated:
        tx_ref = str(uuid.uuid4())
        cart_code = request.data.get("cart_code")
        cart = Cart.objects.get(cart_code = cart_code)
        user = request.user
        total_amount = sum([item.quantity * item.product.price for item in cart.items.all()])
            

        payment = paypalrestsdk.Payment({
            "intent": "sale",
            "payer": {
                "payment_method":"paypal"
            },
             "redirect_urls": {
                 "return_url": f"{BASE_URL}/payment-status?paymentStatus=success&ref={tx_ref}",
                 "cancel_url": f"{BASE_URL}/payment-status?paymentStatus=cancel"
             },
             "transactions": [{
                 "item_list": {
                     "items": [{
                         "name": "Cart Items",
                         "sku": "cart",
                         "price": str(total_amount),
                         "currency": "USD",
                         "quantity": 1
                     }]
                 },
               "amount": {
                    "total": str(total_amount),
                    "currency": "USD"
                },
                "description": "Payment for cart items."
            }]
        })
        print("pay_id", payment)

        transaction, created = Transaction.objects.get_or_create(
                ref=tx_ref,
                cart=cart,
                amount=total_amount,
                user=user,
                status='pending'
            )

        if payment.create():
            for link in payment.links:
                if link.rel == "approval_url":
                    approval_url = str(link.href)
                    return Response({"approval_url": approval_url})
        else:
            return Response({"error": payment.error}, status=400)
        
           

@api_view(['POST'])
def paypal_payment_callback(request):
    payment_id = request.query_params.get('paymentId')
    payer_id = request.query_params.get('PayerID')
    ref = request.query_params.get('ref')

    user = request.user

    print("reff", ref)

    transaction = Transaction.objects.get(ref=ref)

    if payment_id and payer_id:
        payment = paypalrestsdk.Payment.find(payment_id)
        transaction.status = 'completed'
        transaction.save()
        cart = transaction.cart
        cart.paid = True
        cart.user = user
        cart.save()
        return Response({'message':'Payment successful!', 'subMessage': 'You have successfully made payment for the items you purchased.'})
    else:
        return Response({"error": "Invalid payment details."}, status=400)
              