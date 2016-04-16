def wait_for_file(name)
  while !File.exist?(name)
    sleep 0.1
  end
end

def write_file(name)
  File.open(name, 'w') {|f| f.write('stuff') }
end

puts "Pitcher writes ball"
write_file('ball')
puts "Pitcher waits for bat"
wait_for_file('bat')
puts "Pitcher sees bat"

